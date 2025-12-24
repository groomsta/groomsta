import distance from "@turf/distance";
import { point } from "@turf/helpers";

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculate distance between two coordinates in kilometers
 */
export function getDistanceKm(from: Coordinates, to: Coordinates): number {
  const fromPoint = point([from.lng, from.lat]);
  const toPoint = point([to.lng, to.lat]);
  return distance(fromPoint, toPoint, { units: "kilometers" });
}

/**
 * Find partners within a given radius (km)
 * @param customerLocation - Customer's coordinates
 * @param partners - Array of partners with locations
 * @param radiusKm - Search radius in kilometers (default: 5km)
 */
export function findNearbyPartners<T extends { location: Coordinates }>(
  customerLocation: Coordinates,
  partners: T[],
  radiusKm: number = 5
): (T & { distanceKm: number })[] {
  return partners
    .map((partner) => ({
      ...partner,
      distanceKm: getDistanceKm(customerLocation, partner.location),
    }))
    .filter((p) => p.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

// Mock data for testing without DB
export const MOCK_PARTNERS = [
  { id: "p1", name: "Rahul Sharma", location: { lat: 28.6139, lng: 77.209 }, isAvailable: true },
  { id: "p2", name: "Priya Singh", location: { lat: 28.6229, lng: 77.215 }, isAvailable: true },
  { id: "p3", name: "Amit Kumar", location: { lat: 28.6339, lng: 77.225 }, isAvailable: false },
  { id: "p4", name: "Sneha Patel", location: { lat: 28.6039, lng: 77.199 }, isAvailable: true },
];
