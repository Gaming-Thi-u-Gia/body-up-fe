import { Button } from '@/components/ui/button';
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ModalChallenge: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg overflow-hidden w-[35%] max-w-4xl">
                <div className="flex justify-end p-2">
                    <button onClick={onClose} className="text-black text-2xl">&times;</button>
                </div>
                <div className="relative pb-[56.25%] h-0 items-center text-center mx-5">
                    <h1 className='text-3xl font-semibold mb-5'>Start This Challenge?</h1>
                    <span className='text-center text-xl font-light'>
                        You can only start 1 program at a time. Starting a challenge allows you to track your progress according to your calendar and gives you access to more features. Are you ready to begin?
                    </span>
                    <div className='flex justify-center gap-6 mt-9'>
                        <Button className='mt-4' variant='primaryOutline' size='default' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className='mt-4' variant='active' size='default' onClick={onConfirm} >
                            Yes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalChallenge;
