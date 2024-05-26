"use client";
import { useState } from "react";

const StarRating = ({ avgStar }: { avgStar: Number }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <>
      <div className="group inline-flex cursor-pointer text-[#D5D5D5] bg-[#FCFCFC] rounded-[15px] px-2 ">
        <span
          className={`group-hover:opacity-100 group-hover:w-auto w-0 transition-all opacity-0 flex  `}
        >
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <span key={currentRating} className="star-label">
                <span
                  className={`text-[25px] ${currentRating <= (hover || rating) ? "text-[#FEE58E]" : ""}`}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(currentRating)}
                >
                  &#9733;
                </span>
              </span>
            );
          })}
        </span>
        <span className="group-hover:opacity-0 group-hover:w-0 bg-[#FCFCFC] rounded-[15px] text-[25px] ">
          &#9733;
        </span>
        <span className=" flex justify-center items-center text-[#303033] font-medium text-[14px] pr-1 ">
          {String(avgStar)}
        </span>
      </div>
    </>
  );
};

export default StarRating;
