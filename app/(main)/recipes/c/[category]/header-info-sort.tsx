"use client";
import { HeaderInfoSortType } from "@/utils/recipe/type";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const HeaderInfoSort = ({
  name,
  description,
  typeSort,
  handleSort,
}: HeaderInfoSortType) => {
  const [isShowSort, setIsShowSort] = useState(false);

  return (
    <div>
      <Link
        href="/recipes"
        className="inline-flex items-center text-[15px] leading-5 font-semibold"
      >
        <MoveLeft /> <span className="pl-2">Back To Recipe Home</span>
      </Link>
      <div className="flex justify-between items-center py-5">
        <div className="max-w-2xl">
          <h1 className="text-[#303033] text-[22px] font-semibold leading-[30px]">
            {name}
          </h1>
          <p className="text-[14px] font-normal leading-[140%]">
            {description}
          </p>
        </div>
        <div className="flex flex-col text-[14px] justify-center items-center">
          <button
            onClick={() => setIsShowSort(!isShowSort)}
            className="relative flex justify-end items-center cursor-pointer"
          >
            Sort by
            <Image
              className="ml-1"
              width={10}
              height={10}
              src="/moredown.svg"
              alt="sort"
            />
            {isShowSort && (
              <ul className="absolute top-[21px] right-0 transition-opacity duration-300 ease-in-out z-[10] cursor-pointer whitespace-nowrap bg-white shadow-lg">
                {typeSort.map((type, index) => (
                  <li
                    key={index}
                    className="py-1 px-2 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap"
                    onClick={() => handleSort(type)}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfoSort;
