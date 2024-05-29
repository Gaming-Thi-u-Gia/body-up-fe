"use client";
import { Button } from "@/components/ui/button";
import { title } from "process";
import Image from "next/image";
import { category } from "@/constants";
import React, { useState } from "react";
import { Link } from "lucide-react";


const CategoryWorkoutVideos = () => {
  const listCategoryItems = [
    {
      id: 1,
      title: "Most Popular",
      detail:
        "These are some of the most popular workout videos. Give them a try and see why people love these routines.",
      categoryURL: "#",
      videos: [
        {
          id: 1,
          title: "Abs in 2 Weeks",
          img: "https://static.chloeting.com/videos/61bbdcdd017bbb985e15f8eb/28972560-5ed2-11ec-b99f-c33e6b9468db.jpeg",
          views: "544M views",
          date: "August 20",
        },
        {
          id: 2,
          title: "Do This Everyday to Lose Weight",
          img: "https://static.chloeting.com/videos/61bbdc7e2cb3b78eb6ac2bba/efca6f80-5ed1-11ec-b182-df31ae6aab45.jpeg",
          views: "217M views",
          date: "August 15",
        },
        {
          id: 3,
          title: "11 Line Abs",
          img: "https://static.chloeting.com/videos/61bbd89dc3d293024898b84d/9ff668d0-5ecf-11ec-b8cd-2976cd667d03.jpeg",
          views: "78M views",
          date: "April 19",
        },
        {
          id: 4,
          title: "Warm Up",
          img: "https://static.chloeting.com/videos/61bbf59552c5c9bf0f2550eb/e43a1620-5ee0-11ec-9a04-3fd984621d67.jpeg",
          views: "72M views",
          date: "May 20",
        },
        {
          id: 5,
          title: "Flat Belly Abs",
          img: "https://static.chloeting.com/videos/61bbbbf0c3d293024898b838/8873f260-5ebe-11ec-9a04-3fd984621d67.jpeg",
          views: "61M views",
          date: "Jan 19",
        },
      ],
    },
    {
      id: 2,
      title: "Most Popular",
      detail:
        "These are some of the most popular workout videos. Give them a try and see why people love these routines.",
      categoryURL: "#",
      videos: [
        {
          id: 1,
          title: "Abs in 2 Weeks",
          img: "https://static.chloeting.com/videos/61bbdcdd017bbb985e15f8eb/28972560-5ed2-11ec-b99f-c33e6b9468db.jpeg",
          views: "544M views",
          date: "August 20",
        },
        {
          id: 2,
          title: "Do This Everyday to Lose Weight",
          img: "https://static.chloeting.com/videos/61bbdc7e2cb3b78eb6ac2bba/efca6f80-5ed1-11ec-b182-df31ae6aab45.jpeg",
          views: "217M views",
          date: "August 15",
        },
        {
          id: 3,
          title: "11 Line Abs",
          img: "https://static.chloeting.com/videos/61bbd89dc3d293024898b84d/9ff668d0-5ecf-11ec-b8cd-2976cd667d03.jpeg",
          views: "78M views",
          date: "April 19",
        },
        {
          id: 4,
          title: "Warm Up",
          img: "https://static.chloeting.com/videos/61bbf59552c5c9bf0f2550eb/e43a1620-5ee0-11ec-9a04-3fd984621d67.jpeg",
          views: "72M views",
          date: "May 20",
        },
        {
          id: 5,
          title: "Flat Belly Abs",
          img: "https://static.chloeting.com/videos/61bbbbf0c3d293024898b838/8873f260-5ebe-11ec-9a04-3fd984621d67.jpeg",
          views: "61M views",
          date: "Jan 19",
        },
      ],
    },
  ];

  return (
    <div>
      {listCategoryItems.map((listCategoryItem) => (
        <div key={listCategoryItem.id}>
          <div className="flex justify-between py-2">
            <div>
              <h2 className="text-[#303033] text-xl font-semibold">
                {listCategoryItem.title}
              </h2>
              <p className="text-sm font-normal">
                {listCategoryItem.detail}
              </p>
            </div>
            <Button variant="primaryOutline" size="default">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-5 my-5">
            {listCategoryItem.videos.map((video) => (
              <div
                key={video.id}
                className="relative bg-white border border-solid border-[#E9E9EF] rounded-lg cursor-pointer h-60 w-56"
                style={{ borderRadius: '20px' }}
              >
                <img
                  className="rounded-t-lg w-full h-32 object-cover"
                  src={video.img}
                  alt={video.title}
                />
                <div className="p-3">
                  <p className="text-lg font-medium text-[#303033] text-sm">
                    {video.title}
                  </p>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-sm text-gray-600">
                  <span>{video.views} • {video.date}</span>
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="icon" className="p-1">
                      <Image
                        width={16}
                        height={16}
                        src="/i.svg"
                        alt="i"
                      />
                    </Button>
                    <Button variant="secondary" size="icon" className="p-1">
                      <Image
                        width={18}
                        height={18}
                        src="/heart.svg"
                        alt="heart"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryWorkoutVideos;