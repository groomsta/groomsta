'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import StarRating from '@/app/components/ui/StarRating';
import { Loader2 } from 'lucide-react';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: string;
    serviceName: string;
}

export default function RatingModal({ isOpen, onClose, bookingId, serviceName }: RatingModalProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log('Submitted review:', { bookingId, rating, comment });

        setIsSubmitting(false);
        onClose();
        // Reset form
        setRating(0);
        setComment('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rate your experience</DialogTitle>
                    <DialogDescription>
                        How was your {serviceName}? Your feedback helps us improve.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <h3 className="font-semibold text-lg text-[#1A1A1A]">
                        {rating === 0 ? 'Tap to Rate' : rating === 5 ? 'Excellent!' : rating >= 4 ? 'Very Good' : rating >= 3 ? 'Good' : 'Fair'}
                    </h3>
                    <StarRating
                        size={40}
                        initialRating={rating}
                        onRatingChange={setRating}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="comment" className="text-sm font-medium text-gray-700">Additional Comments (Optional)</label>
                    <Textarea
                        id="comment"
                        placeholder="Tell us what you liked or what needs improvement..."
                        className="resize-none min-h-[100px]"
                        value={comment}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                    />
                </div>

                <DialogFooter className="sm:justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className="bg-[#0C3C85] hover:bg-blue-800"
                        disabled={rating === 0 || isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Review'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
