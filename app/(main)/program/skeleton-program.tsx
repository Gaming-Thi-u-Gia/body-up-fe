import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonProgramCard = () => {
    return (
        <div className="flex w-full bg-white rounded-2xl px-[15px] py-[47px] gap-3">
            <Skeleton width="52%" height="100%" className="rounded-2xl" />
            <div className="flex flex-col gap-3 relative w-[48%]">
                <Skeleton width="30%" height="12px" />
                <Skeleton width="70%" height="18px" />
                <div className="flex gap-1">
                    <Skeleton width={50} height={24} className="rounded-full" />
                    <Skeleton width={50} height={24} className="rounded-full" />
                </div>
                <div className="flex flex-col py-2 gap-1">
                    <Skeleton width="30%" height="10px" />
                    <Skeleton width="50%" height="14px" />
                </div>
                <div className="flex flex-col py-2 gap-1">
                    <Skeleton width="30%" height="10px" />
                    <Skeleton width="50%" height="14px" />
                </div>
                <Skeleton width="100px" height="32px" className="absolute bottom-0" />
            </div>
        </div>
    );
};

export default SkeletonProgramCard;
