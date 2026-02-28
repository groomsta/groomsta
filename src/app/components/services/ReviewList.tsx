'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import StarRating from '@/app/components/ui/StarRating';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReviewList() {
    // Mock Data
    const reviews = [
        { id: 1, name: 'Anjali Sharma', date: '2 days ago', rating: 5, comment: 'Excellent service! The groomer was very professional and punctual. Highly recommended.', likes: 12 },
        { id: 2, name: 'Rohan Mehta', date: '1 week ago', rating: 4, comment: 'Good experience overall. The haircut was great, but they arrived 10 mins late.', likes: 4 },
        { id: 3, name: 'Sana Khan', date: '2 weeks ago', rating: 5, comment: 'Absolutely loved the spa treatment. Very relaxing and hygienic.', likes: 8 },
    ];

    const ratingDistribution = [
        { stars: 5, count: 85 },
        { stars: 4, count: 10 },
        { stars: 3, count: 3 },
        { stars: 2, count: 1 },
        { stars: 1, count: 1 },
    ];

    const averageRating = 4.8;
    const totalReviews = 124;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold font-montserrat text-[#1A1A1A]">Customer Reviews</h3>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Average Rating */}
                <div className="flex flex-col items-center justify-center p-6 bg-blue-50/50 rounded-xl border border-blue-100">
                    <h2 className="text-5xl font-bold text-[#0C3C85] mb-2">{averageRating}</h2>
                    <StarRating initialRating={5} readOnly size={20} />
                    <p className="text-gray-500 mt-2 text-sm">{totalReviews} reviews</p>
                </div>

                {/* Rating Bars */}
                <div className="md:col-span-2 space-y-3">
                    {ratingDistribution.map((item) => (
                        <div key={item.stars} className="flex items-center gap-4">
                            <div className="flex items-center gap-1 w-12 text-sm font-medium text-gray-700">
                                {item.stars} <span className="text-yellow-400">★</span>
                            </div>
                            <Progress value={item.count} className="h-2 flex-1" />
                            <div className="w-10 text-right text-xs text-gray-500">{item.count}%</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-blue-100 text-[#0C3C85] font-bold">
                                        {review.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-bold text-[#1A1A1A] text-sm">{review.name}</h4>
                                    <p className="text-xs text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            <StarRating initialRating={review.rating} readOnly size={14} />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {review.comment}
                        </p>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#0C3C85] h-auto p-0 hover:bg-transparent">
                                <ThumbsUp className="w-4 h-4 mr-1.5" />
                                <span className="text-xs">Helpful ({review.likes})</span>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Button variant="outline" className="w-full">Load More Reviews</Button>
        </div>
    );
}
