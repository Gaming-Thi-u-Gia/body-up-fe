import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import StarRating from '@/app/(main)/recipes/star-rating';

interface ReviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const changeRating = (newRating: number) => {
        setRating(newRating);
    };

    const handleSubmit = () => {
        console.log('Rating:', rating);
        console.log('Review:', review);

        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogTitle>Rate the Challenge</DialogTitle>
                <DialogDescription>
                    Please rate and review your experience with this challenge.
                </DialogDescription>
                <div className="ml-0 mt-2 flex">
                    <StarRating rating={rating} onChange={changeRating} />
                </div>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full mt-2 p-2 border rounded"
                />
                <div className='flex gap-3 mr-0 justify-end'>
                    <Button className='mt-4' variant='primaryOutline' size='default' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className='mt-4' variant='active' size='default' >
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewDialog;
