import React from "react";

const SkeletonLoader: React.FC = () => {
    return (
        <div className="max-w-7xl flex items-center justify-center mx-auto my-8 animate-pulse">
            <div className="w-full flex">
                <div className="flex-row w-[25%]">
                    <div className="flex-row bg-transparent border-r border-gray-200/50 bg-white rounded-2xl pb-[1px]">
                        <div className="relative">
                            <div className="w-full h-48 bg-gray-200 rounded-2xl"></div>
                        </div>
                        <div className="flex-row my-4 mx-5">
                            <div className="w-1/3 h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="bg-gray-200 h-[200px] w-full rounded-2xl"></div>
                    </div>
                </div>

                <div className="w-[75%] ml-10">
                    <div className="flex justify-between pb-4">
                        <div className="w-1/2 h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="flex gap-6 items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="h-32 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
