"use client";
import Image from "next/image";
import React, { useState } from "react";

type HeaderInfoSortProps = {
  name: string;
  description: string;
  typeSort: string[];
  handleSortChange: (type: string) => void;
};

const HeaderInfoSort = ({
  name,
  description,
  typeSort,
  handleSortChange,
}: HeaderInfoSortProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleToggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  return (
    <div className="flex justify-between items-center py-5">
      <div className="max-w-2xl">
        <h1 className="text-[#303033] text-[22px] font-semibold leading-[30px]">
          {name}
        </h1>
        <p className="text-[14px] font-normal leading-[140%]">{description}</p>
      </div>
      <div className="flex flex-col text-[14px] justify-center items-center">
        <button
          onClick={handleToggleSort}
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
          {isSortOpen && (
            <ul className="absolute top-[21px] right-0 transition-opacity duration-300 ease-in-out z-[10] cursor-pointer whitespace-nowrap bg-white shadow-lg">
              {typeSort.map((type, index) => (
                <li
                  key={index}
                  className="py-1 px-2 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap"
                  onClick={() => handleSortChange(type)}
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </button>
      </div>
    </div>
  );
};

export default HeaderInfoSort;
