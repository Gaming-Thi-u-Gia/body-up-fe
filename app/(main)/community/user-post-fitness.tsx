import React from "react";
import defaultProfile from "/public/default-iProfile.png";
import Image from "next/image";
import fitness_icon from "/public/fitness-icon.svg";
import message_icon from "/public/message-icon.svg";
import saved_icon from "/public/saved-posts-icon.svg";
import share_icon from "/public/share-icon.svg";
const PostFitness = () => {
    return (
        <div className="w-full h-[200px] mb-10 flex flex-col p-2 gap-2 bor">
            <div className="w-full flex justify-between items-center ">
                <div className="flex gap-2 items-center">
                    <Image
                        src={defaultProfile}
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <label className="text-[#303033] text-sm" htmlFor="">
                        stellaria
                    </label>
                    <span className="text-sm">5 days ago</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1 rounded-full bg-[#EFF0F4] w-[81.64px] h-7 justify-center items-center">
                        <Image
                            src={fitness_icon}
                            alt="logo"
                            width={13}
                            height={12}
                        />
                        <span className="text-[12px]">Workout</span>
                    </div>
                    <div className="flex gap-1 rounded-full bg-[#EFF0F4] w-[81.64px] h-7 justify-center items-center">
                        <Image
                            src={fitness_icon}
                            alt="logo"
                            width={13}
                            height={12}
                        />
                        <span className="text-[12px]">Workout</span>
                    </div>
                </div>
            </div>
            <h1 className="text-black text-lg font-bold mt-3">
                How Was Your Workout Today? | Weekly Thread
            </h1>
            <div className="text-[#303033] text-[16px] h-[48px] mt-2">
                Want to share your daily fitness journey with the community and
                cheer each other on? This is the place to do it! Tell us how
                your workout went, what program or activity you did, new habits
                you're working on, and see…
            </div>
            <div className="flex gap-2 items-center mt-3">
                <div className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center">
                    <Image
                        src={message_icon}
                        alt="logo"
                        width={20}
                        height={20}
                    />
                    <span className="text-[12px]">
                        <span>33</span> Replies
                    </span>
                </div>
                <div className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center">
                    <Image src={saved_icon} alt="logo" width={20} height={20} />
                    <span className="text-[12px]">Saved</span>
                </div>
                <div className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center">
                    <Image src={share_icon} alt="logo" width={20} height={20} />
                    <span className="text-[12px]">Share</span>
                </div>
            </div>

            <hr className="mt-3" />
        </div>
    );
};

export default PostFitness;
