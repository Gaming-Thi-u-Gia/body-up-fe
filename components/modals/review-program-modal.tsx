"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import React, { useState, useEffect } from 'react';
import { useFeedbackModel } from '@/stores/use-feedback';
import { Button } from '../ui/button';
import { createFeedback } from '@/utils/user';
import { useAuthStore } from '../providers/auth-provider';
import StarRating from './star-rating';
import { toast } from 'sonner';

function ReviewProgramModel() {
    const { isOpen, workoutProgramId, close } = useFeedbackModel();
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const { sessionToken } = useAuthStore((store) => store);

    useEffect(() => {
        if (isOpen) {
            setFeedback('');
            setRating(0);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!sessionToken || !workoutProgramId) {
            console.error('No session token or workout program ID available');
            return;
        }

        try {
            await createFeedback(sessionToken, workoutProgramId, feedback, rating);
            toast.success('Feedback submitted successfully');
            close();
        } catch (error) {
            toast.error('Failed to submit feedback');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" key={isOpen ? 'open' : 'closed'}>
                <div className="bg-white rounded-lg overflow-hidden w-[50%] max-w-6xl p-5 z-50">
                    <div className="flex justify-end p-2">
                        <button onClick={close} className="text-black text-2xl">&times;</button>
                    </div>
                    <div className="text-center">
                        <DialogTitle className='text-3xl font-semibold mb-5'>Rate the Challenge</DialogTitle>
                        <DialogDescription className='text-center text-xl font-light mb-5'>
                            Please rate and review your experience with this challenge.
                        </DialogDescription>
                        <StarRating rating={rating} setRating={setRating} />
                        <input
                            type="text"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Write your feedback here..."
                        />
                        <div className='flex justify-center gap-6 mt-9'>
                            <Button className='mt-4' variant='primaryOutline' size='default' onClick={close}>
                                Cancel
                            </Button>
                            <Button className='mt-4' variant='active' size='default' onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ReviewProgramModel;
