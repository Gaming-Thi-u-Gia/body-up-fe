import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonVideoCard = () => {
    return (
        <div className="relative bg-white border border-solid border-[#E9E9EF] rounded-lg h-60 w-56">
            <div className="relative w-full h-[126px]">
                <Skeleton height="100%" className="rounded-t-lg object-cover rounded-2xl" />
            </div>
            <div className="p-3">
                <Skeleton height={20} count={2} />
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center font-medium text-sm text-[#868A93]">
                <Skeleton width={100} height={16} />
                <div className="flex space-x-2">
                    <Skeleton width={18} height={19} />
                    <Skeleton width={20} height={20} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonVideoCard;
