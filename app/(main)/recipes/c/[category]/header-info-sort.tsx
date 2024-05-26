"use client";
import Image from "next/image";
import React, { useState } from "react";
const HeaderInfoSort = ({
  title,
  detail,
}: {
  title: String;
  detail: String;
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const handleToggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];
  return (
    <>
      <div className="flex justify-between">
        <div>
          <text className="text-[#303033] text-[22px] font-semibold leading-[30px]">
            {title}
          </text>
          <p className="text-[14px] font-normal leading-[140%] h-[50%]">
            {detail}
          </p>
        </div>
        <div>
          <div className="w-[120px] text-[14px] ">
            <button
              onClick={handleToggleSort}
              className="flex justify-end items-center cursor-pointer "
            >
              Sort by
              <Image
                className="ml-1"
                width={10}
                height={10}
                src="/moredown.svg"
                alt="add"
              />
            </button>
            <div className="sortby">
              <ul
                className={`transition-opacity duration-3000 ease-in-out z-[1] cursor-pointer whitespace-nowrap bg-white rounded-2xl ${isSortOpen ? "opacity-100" : "opacity-0"}`}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderInfoSort;
