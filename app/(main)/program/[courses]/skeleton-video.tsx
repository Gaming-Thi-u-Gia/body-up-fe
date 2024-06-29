import React from "react";

const DailyExerciseSkeleton = () => {
    return (
        <div className="w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4">
            <div className="flex justify-between w-full text-center items-center py-[10px]">
                <div className="bg-gray-300 rounded-md" style={{ width: '40%', height: '30px' }}></div>
                <div className="bg-gray-300 rounded-md" style={{ width: '20%', height: '20px' }}></div>
            </div>
            {Array.from(new Array(3)).map((_, index) => (
                <div key={index} className="mt-4">
                    <div className="bg-gray-300 rounded-md" style={{ width: '100%', height: '118px' }}></div>
                    <div className="mt-2">
                        <div className="bg-gray-300 rounded-md" style={{ width: '60%', height: '24px' }}></div>
                        <div className="bg-gray-300 rounded-md" style={{ width: '40%', height: '24px' }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DailyExerciseSkeleton;
