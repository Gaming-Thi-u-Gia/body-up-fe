import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonProgramCard = () => {
    return (
        <div className="flex flex-col bg-white rounded-2xl p-4 shadow-md h-72">
            <Skeleton className="rounded-2xl h-32 w-full mb-4" />
            <div className="flex flex-col gap-3">
                <Skeleton width="60%" height="20px" />
                <Skeleton width="40%" height="16px" />
                <div className="flex gap-2 mt-2">
                    <Skeleton width={80} height={24} className="rounded-full" />
                    <Skeleton width={80} height={24} className="rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonProgramCard;
