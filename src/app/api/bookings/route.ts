import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Booking creation schema
const createBookingSchema = z.object({
    userId: z.string().uuid(),
    serviceId: z.string().uuid(),
    serviceType: z.enum(["home", "salon"]),
    addressId: z.string().uuid().optional(),
    salonId: z.string().uuid().optional(),
    bookingDate: z.string(), // ISO date string
    timeSlot: z.enum(["morning", "afternoon", "evening"]),
    preferredStartTime: z.string().optional(),
    addons: z.array(z.object({
        addonId: z.string().uuid(),
        quantity: z.number().int().min(1).default(1),
    })).optional(),
    couponCode: z.string().optional(),
    paymentType: z.enum(["full", "partial", "post_service"]).default("full"),
    paymentMethod: z.enum(["online", "cash", "wallet"]).default("online"),
});

// Generate booking number: GRM-2026-XXXXXX
function generateBookingNumber(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `GRM-${year}-${random}`;
}

// POST /api/bookings — Create a new booking
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = createBookingSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid booking data", details: parsed.error.issues },
                { status: 400 }
            );
        }

        const data = parsed.data;

        // Validate home booking has address
        if (data.serviceType === "home" && !data.addressId) {
            return NextResponse.json(
                { error: "Address is required for home service bookings" },
                { status: 400 }
            );
        }

        // Fetch service details for pricing
        const service = await prisma.service.findUnique({
            where: { id: data.serviceId },
            include: {
                addons: { where: { isActive: true } },
            },
        });

        if (!service) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }

        // Calculate pricing
        const serviceBasePrice = Number(service.basePrice);
        let addonsPrice = 0;
        const bookingAddons: { addonId: string; addonName: string; addonPrice: number; quantity: number }[] = [];

        if (data.addons && data.addons.length > 0) {
            for (const addonReq of data.addons) {
                const addon = service.addons.find(a => a.id === addonReq.addonId);
                if (addon) {
                    const price = Number(addon.basePrice) * addonReq.quantity;
                    addonsPrice += price;
                    bookingAddons.push({
                        addonId: addon.id,
                        addonName: addon.name,
                        addonPrice: Number(addon.basePrice),
                        quantity: addonReq.quantity,
                    });
                }
            }
        }

        // Apply coupon discount if provided
        let discountAmount = 0;
        if (data.couponCode) {
            const coupon = await prisma.coupon.findUnique({
                where: { code: data.couponCode },
            });

            if (coupon && coupon.isActive && new Date() >= coupon.validFrom && new Date() <= coupon.validUntil) {
                if (coupon.discountType === "percentage") {
                    discountAmount = (serviceBasePrice + addonsPrice) * Number(coupon.discountValue) / 100;
                    if (coupon.maxDiscountAmount) {
                        discountAmount = Math.min(discountAmount, Number(coupon.maxDiscountAmount));
                    }
                } else {
                    discountAmount = Number(coupon.discountValue);
                }
            }
        }

        // Check if user has active membership for additional discount
        const membership = await prisma.userMembership.findFirst({
            where: {
                userId: data.userId,
                subscriptionStatus: "active",
                expiresAt: { gte: new Date() },
            },
            include: { plan: true },
        });

        if (membership && membership.plan.discountPercent) {
            const memberDiscount = (serviceBasePrice + addonsPrice) * Number(membership.plan.discountPercent) / 100;
            discountAmount += memberDiscount;
        }

        const totalAmount = Math.max(0, serviceBasePrice + addonsPrice - discountAmount);
        const commissionPercent = 20; // 20% platform commission
        const commissionAmount = totalAmount * commissionPercent / 100;
        const partnerEarning = totalAmount - commissionAmount;

        // Create booking in a transaction
        const booking = await prisma.$transaction(async (tx) => {
            const newBooking = await tx.booking.create({
                data: {
                    bookingNumber: generateBookingNumber(),
                    userId: data.userId,
                    serviceId: data.serviceId,
                    serviceType: data.serviceType,
                    addressId: data.addressId || null,
                    salonId: data.salonId || null,
                    bookingDate: new Date(data.bookingDate),
                    timeSlot: data.timeSlot,
                    serviceBasePrice,
                    addonsPrice,
                    discountAmount,
                    totalAmount,
                    partnerEarning,
                    commissionAmount,
                    commissionPercent,
                    netPayoutAmount: partnerEarning,
                    status: "pending",
                    paymentStatus: "pending",
                    otpStart: String(Math.floor(1000 + Math.random() * 9000)),
                    otpEnd: String(Math.floor(1000 + Math.random() * 9000)),
                },
            });

            // Create booking addons
            if (bookingAddons.length > 0) {
                await tx.bookingAddon.createMany({
                    data: bookingAddons.map(addon => ({
                        bookingId: newBooking.id,
                        addonId: addon.addonId,
                        addonName: addon.addonName,
                        addonPrice: addon.addonPrice,
                        quantity: addon.quantity,
                    })),
                });
            }

            // Create initial status history
            await tx.bookingStatusHistory.create({
                data: {
                    bookingId: newBooking.id,
                    fromStatus: null,
                    toStatus: "pending",
                    changedByUserId: data.userId,
                    notes: "Booking created",
                },
            });

            // Create notification for the user
            await tx.notification.create({
                data: {
                    userId: data.userId,
                    notificationType: "booking_created",
                    title: "Booking Confirmed!",
                    message: `Your booking ${newBooking.bookingNumber} has been placed. We're finding the best partner for you.`,
                    channels: ["push", "email"],
                    bookingId: newBooking.id,
                },
            });

            return newBooking;
        });

        return NextResponse.json({
            success: true,
            booking: {
                id: booking.id,
                bookingNumber: booking.bookingNumber,
                totalAmount: booking.totalAmount,
                status: booking.status,
                paymentStatus: booking.paymentStatus,
            },
            message: "Booking created successfully! Finding a partner for you.",
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        );
    }
}

// GET /api/bookings?userId=xxx&status=active|past|cancelled
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const status = searchParams.get("status"); // active, past, cancelled
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        // Build status filter
        let statusFilter: object = {};
        if (status === "active") {
            statusFilter = { status: { in: ["pending", "accepted", "on_the_way", "started"] } };
        } else if (status === "past") {
            statusFilter = { status: "completed" };
        } else if (status === "cancelled") {
            statusFilter = { status: "cancelled" };
        }

        const [bookings, total] = await Promise.all([
            prisma.booking.findMany({
                where: {
                    userId,
                    ...statusFilter,
                },
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    partner: {
                        select: {
                            id: true,
                            fullName: true,
                            profileImageUrl: true,
                            phone: true,
                            averageRating: true,
                        },
                    },
                    address: true,
                    addons: true,
                    reviews: { select: { id: true, overallRating: true } },
                },
            }),
            prisma.booking.count({
                where: { userId, ...statusFilter },
            }),
        ]);

        return NextResponse.json({
            bookings,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json(
            { error: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
