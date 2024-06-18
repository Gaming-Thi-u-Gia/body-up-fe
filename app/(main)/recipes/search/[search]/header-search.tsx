"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import RecipeNavbar from "../../recipe-navbar";
import { RecipeCardType } from "@/utils/recipe/type";

const HeaderSearch = ({
  totalSearchResult,
  handleSortType,
}: {
  totalSearchResult: number;
  handleSortType: (type: string) => void;
}) => {
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];

  return (
    <div className="max-w-7xl mx-auto">
      <RecipeNavbar />
      <div className="flex">
        <div className="flex-1 bg-white py-2 my-3 flex justify-between items-center px-5 rounded-2xl">
          <span>
            Showing <b>{totalSearchResult}</b> matching <b>Search Criteria</b>
          </span>
        </div>
        <div
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="relative flex justify-end items-center cursor-pointer min-w-[200px]"
        >
          Sort by
          <ChevronDown width={10} />
          {isSortOpen && (
            <ul className="absolute top-[50px] right-0 transition-opacity duration-300 ease-in-out z-[10] cursor-pointer whitespace-nowrap bg-white">
              {typeSort.map((type, index) => (
                <li
                  className="py-1 px-1 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap"
                  key={index}
                  onClick={() => {
                    handleSortType(type);
                    setIsSortOpen(false);
                  }}
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
