'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface StarRatingProps {
    totalStars?: number;
    initialRating?: number;
    readOnly?: boolean;
    onRatingChange?: (rating: number) => void;
    size?: number;
}

export default function StarRating({
    totalStars = 5,
    initialRating = 0,
    readOnly = false,
    onRatingChange,
    size = 20
}: StarRatingProps) {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (selectedRating: number) => {
        if (!readOnly) {
            setRating(selectedRating);
            if (onRatingChange) {
                onRatingChange(selectedRating);
            }
        }
    };

    const handleMouseEnter = (selectedRating: number) => {
        if (!readOnly) {
            setHoverRating(selectedRating);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverRating(0);
        }
    };

    return (
        <div className="flex gap-1" onMouseLeave={handleMouseLeave}>
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = (hoverRating || rating) >= starValue;

                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        className={cn(
                            "transition-colors focus:outline-none",
                            readOnly ? "cursor-default" : "cursor-pointer"
                        )}
                        disabled={readOnly}
                    >
                        <Star
                            size={size}
                            className={cn(
                                "transition-all duration-200",
                                isFilled
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-100 text-gray-300"
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
}
