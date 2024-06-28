// components/Modal.js
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, videoId }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg overflow-hidden w-[80%] max-w-4xl">
                <div className="flex justify-end p-2">
                    <button onClick={onClose} className="text-black text-2xl">&times;</button>
                </div>
                <div className="relative pb-[56.25%] h-0">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Modal;
