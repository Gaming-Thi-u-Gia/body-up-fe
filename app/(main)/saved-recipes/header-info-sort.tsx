"use client";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
const HeaderInfoSort = ({ title }: { title: String }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const handleToggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];
  return (
    <>
      <div className="flex justify-between items-center py-5 max-w-7xl mx-auto">
        <div>
          <a
            href="/recipes"
            className="inline-flex items-center text-[15px] leading-5 font-semibold"
          >
            <MoveLeft /> <span className="pl-2">Back To Recipe Home</span>
          </a>
        </div>
        <div className="max-w-2xl">
          <text className="text-[#303033] text-[22px] font-semibold leading-[30px]">
            {title}
          </text>
        </div>
        <div className="flex flex-col text-[14px] justify-center items-center ">
          <button
            onClick={handleToggleSort}
            className="relative flex justify-end items-center cursor-pointer "
          >
            Sort by
            <Image
              className="ml-1"
              width={10}
              height={10}
              src="/moredown.svg"
              alt="add"
            />
            {isSortOpen && (
              <ul
                className={`absolute top-[21px] right-0 transition-opacity duration-3000 ease-in-out z-[10] cursor-pointer whitespace-nowrap bg-white `}
              >
                {typeSort.map((type, index) => {
                  return (
                    <li
                      className="py-1 px-1 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap"
                      key={index}
                    >
                      {type}
                    </li>
                  );
                })}
              </ul>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderInfoSort;
