"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { title } from "process";
import Image from "next/image";
import { category } from "@/constants";

const BodyLatestWorkoutVideos = () => {
    const listLastestWorkoutVideos = [
        {
            id_video: 1,
            title: "15 Min Intense HIIT",
            dietary: ["HIIT & CARDIO", "FULL BODY"],
            img: "/video1.png",
            views: "203K views",
            date: "May 24",
        },
        {
            id_video: 2,
            title: "Toned Arms & Core Workout",
            dietary: ["LF"],
            img: "/video2.png",
            views: "186K views",
            date: "May 24",
        },
        {
            id_video: 3,
            title: "10 Min Intense Abs",
            dietary: ["LF"],
            img: "/video3.png",
            views: "142K views",
            date: "May 24",
        },
    ];

    return (
        <div className="max-w-7xl h-full mx-auto">
            <div className="flex justify-between py-[25px]">
                <div>
                    <h2 className="text-[#303033] text-[22px] font-semibold leading-[30px]">
                        Latest Workouts
                    </h2>
                </div>
                <Button variant="primaryOutline" size="default">
                    View All
                </Button>
            </div>
            <div className="flex gap-10">
                {/* Video1 */}
                <div
                    className="flex relative gap-10 w-[737px] h-[242.27px] px-4 pt-[24px] pb-[24px] justify-self-start bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px]"
                    style={{ borderRadius: "20px" }}
                >
                    <div className="relative">
                        <div>
                          <Image
                              className="h-[95%] cursor-pointer rounded-2xl"
                              width={320}
                              height={1}
                              src="/video1.png"
                              alt="Video image"
                          />
                        </div>
                        <div className="absolute w-10 right-[12px] bottom-[24px] rounded-[4px] bg-[#303033]">
                          <p className="text-[#FAFAFA] text-[10px] font-bold text-center leading-[14px] py-[2px] px-[6px]">16:22</p>
                        </div>
                    </div>
                    <div className="flex-1 ml-10px relative">
                        <p className="text-[18px] font-medium leading-[150%] tracking-wide max-w-[255px] h-[15%] text-[#303033] cursor-pointer">
                            <a href="#">{listLastestWorkoutVideos[0].title}</a>
                        </p>
                        {/* Frame for dietary information */}
                        <div className="flex mt-2">
                            {listLastestWorkoutVideos[0].dietary.map(
                                (dietary, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700 mr-2"
                                    >
                                        {dietary}
                                    </div>
                                )
                            )}
                        </div>
                        {/* End of frame for dietary information */}
                        <div className="h-[10%]">{/* Star */}</div>
                        <div className="absolute bottom-0 flex h-[12.5%] w-full justify-between items-center">
                            <span className="text-[14px] font-medium text-sm text-[#868A93]">
                                {listLastestWorkoutVideos[0].views} •{" "}
                                {listLastestWorkoutVideos[0].date}
                            </span>
                            <div className="flex gap-2">
                                <Image
                                    width={18}
                                    height={19}
                                    src="/i.svg"
                                    alt="i"
                                />
                                <Image
                                    width={20}
                                    height={20}
                                    src="/heart.svg"
                                    alt="heart"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video2 */}
                <div
                    className="flex-1 justify-self-end relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer w-[232px] h-[242px]"
                    style={{ borderRadius: "20px" }}
                >
                    <div className="relative">
                        <div>
                            <Image
                                className="h-[60%] cursor-pointer rounded-2xl"
                                width={300}
                                height={1}
                                src="/video2.png"
                                alt="Video image"
                            />
                        </div>
                        <div className="absolute w-10 right-[10px] bottom-[10px] rounded-[4px] bg-[#303033]">
                          <p className="text-[#FAFAFA] text-[10px] font-bold text-center leading-[14px] py-[2px] px-[6px]">16:22</p>
                        </div>
                    </div>
                    <p className="text-[16px] font-normal leading-[20px] tracking-wide text-[#303033] flex items-center px-5 py-3">
                        {listLastestWorkoutVideos[1].title}
                    </p>
                    <div className="absolute bottom-3 left-5 right-5 flex justify-between items-center font-medium text-sm text-[#868A93]">
                        <span>
                            {listLastestWorkoutVideos[1].views} •{" "}
                            {listLastestWorkoutVideos[1].date}
                        </span>
                        <div className="flex gap-2">
                            <Image
                                width={18}
                                height={19}
                                src="/i.svg"
                                alt="i"
                            />
                            <Image
                                width={20}
                                height={20}
                                src="/heart.svg"
                                alt="heart"
                            />
                        </div>
                    </div>
                </div>

                {/* Video3 */}
                <div
                    className="flex-1 justify-self-end relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer w-[232px] h-[242px]"
                    style={{ borderRadius: "20px" }}
                >
                    <div className="relative">
                        <div>
                            <Image
                                className="h-[60%] cursor-pointer rounded-2xl"
                                width={300}
                                height={1}
                                src="/video3.png"
                                alt="Video image"
                            />
                        </div>
                        <div className="absolute w-10 right-[10px] bottom-[10px] rounded-[4px] bg-[#303033]">
                          <p className="text-[#FAFAFA] text-[10px] font-bold text-center leading-[14px] py-[2px] px-[6px]">16:22</p>
                        </div>
                    </div>
                    <p className="text-[16px] font-normal leading-[20px] tracking-wide text-[#303033] flex items-center px-5 py-3">
                        {listLastestWorkoutVideos[2].title}
                    </p>
                    <div className="absolute bottom-3 left-5 right-5 flex justify-between items-center font-medium text-sm text-[#868A93]">
                        <span>
                            {listLastestWorkoutVideos[2].views} •{" "}
                            {listLastestWorkoutVideos[2].date}
                        </span>
                        <div className="flex gap-2">
                            <Image
                                width={18}
                                height={19}
                                src="/i.svg"
                                alt="i"
                            />
                            <Image
                                width={20}
                                height={20}
                                src="/heart.svg"
                                alt="heart"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center w-full h-11 rounded-xl border border-[#EFF0F4] bg-white cursor-pointer my-5">
                <p className="text-[#868A93] text-center text-base leading-6">
                    Load More Latest Workouts
                </p>
            </div>
        </div>
    );
};

export default BodyLatestWorkoutVideos;