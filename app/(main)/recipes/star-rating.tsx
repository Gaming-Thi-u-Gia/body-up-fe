"use client";
import { Star } from "lucide-react";
import { useState } from "react";
const StarRating = ({ avgStar }: { avgStar: Number }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const handleRating = (currentRating: number) => {
    setRating(currentRating);
    console.log(currentRating);
  };
  return (
    <div className="group inline-flex cursor-pointer text-[#D5D5D5] bg-[#FCFCFC] rounded-[15px] px-2 py-1">
      <span className="group-hover:opacity-100 group-hover:w-auto w-0 opacity-0 flex items-center">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <span key={currentRating} className="star-label">
              <span
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRating(currentRating)}
              >
                <Star
                  fill={
                    currentRating <= (hover || rating) ? "#FEE58E" : "#D5D5D5"
                  }
                  strokeWidth={0}
                />
              </span>
            </span>
          );
        })}
      </span>
      <span className="flex items-center group-hover:opacity-0 group-hover:w-0 bg-[#FCFCFC] rounded-[15px] text-[25px] ">
        <Star strokeWidth={0} fill="#D5D5D5" />
      </span>
      <span className=" flex justify-center items-center text-[#303033] font-medium text-[14px] pr-1 ">
        {String(avgStar)}
      </span>
    </div>
  );
};
export default StarRating;
