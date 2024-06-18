/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import fitness_icon from "/public/fitness-icon.svg";

const MyCommentPage = () => {
    return (
        <div className="w-[823px] mt-3">
            <div className="flex flex-col gap-2 hover:bg-[#f5f5f5] rounded-lg p-3">
                <div className="flex items-center gap-3">
                    <h1 className="text-lg font-medium">
                        How Was Your Workout Today? Weekly Thread
                    </h1>
                    <div className="flex gap-1 rounded-full bg-[#EFF0F4] px-3 py-2 justify-center items-center">
                        <Image
                            src={fitness_icon}
                            alt="logo"
                            width={13}
                            height={12}
                        />
                        <span className="text-[12px]">Workout</span>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3 mb-1">
                    <div className="flex flex-col p-2 bg-[#ebf4ff] w-full rounded-lg">
                        <span className="text-[10px] text-gray-500 font-medium">
                            a few second ago
                        </span>
                        <div className="text-sm line-clamp-3">
                            I just finished day 10 of the 2021 2-week shred
                            challenge and oh my I was sweating! I've been
                            hitting another weight loss plateau and I hope that
                            fixing my calorie deficit to around -650 cals a day
                            will help. Keeping my protein up to around 90g a day
                            or more (doing my best to hit the 90g is hard enough
                            lol) I am so excited to finish this challenge and
                            start the shred and tone one! Instead of seeing
                            progress in my measurements in the past week, I've
                            seen progress in doing the ab workouts better. I'm
                            able to hold certain positions longer and engage my
                            core better than before! I am very happy with
                            everything so far and its been a major process these
                            last 5 months.
                        </div>
                    </div>
                    <div className="flex flex-col p-2 bg-[#ebf4ff] w-full rounded-lg">
                        <span className="text-[10px] text-gray-500 font-medium">
                            a few second ago
                        </span>
                        <div className="text-sm">-4lbs</div>
                    </div>
                    <div className="flex flex-col p-2 bg-[#ebf4ff] w-full rounded-lg">
                        <span className="text-[10px] text-gray-500 font-medium">
                            a few second ago
                        </span>
                        <div className="text-sm">-4lbs</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCommentPage;
