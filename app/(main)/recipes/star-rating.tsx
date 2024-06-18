"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { fetchPostRatingRecipe } from "@/utils/recipe/fetch";
import { StarRatingType } from "@/utils/recipe/type";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const StarRating = ({ id, avgStar, currentRating }: StarRatingType) => {
  const { sessionToken } = useAuthStore((store) => store);
  const [currentHover, setCurrentHover] = useState<null | number>(null);
  const [curentRating, setCurrentRating] = useState<number>(currentRating);
  const [currentAverageStar, setCurrentAverageStar] = useState<number>(avgStar);
  const handleCurrentRating = async (numberStar: number) => {
    try {
      const response = await fetchPostRatingRecipe(
        id,
        sessionToken!,
        numberStar
      );
      setCurrentRating(response.star);
      setCurrentAverageStar(parseFloat(response.avgStar.toFixed(2)));
      toast.success("Rating Recipe Successfully", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } catch (error) {
      toast.error("Please login account", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  return (
    <div className="group inline-flex cursor-pointer text-[#D5D5D5] bg-[#FCFCFC] rounded-[15px] px-2 py-1">
      <span className="group-hover:opacity-100 group-hover:w-auto w-0 opacity-0 flex items-center">
        <span className="cursor-pointer flex">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="star-label">
              <Star
                fill={`${(currentHover ?? curentRating) > index ? "#FEE58E" : "#D3D3D3"}`}
                strokeWidth={0}
                width={34}
                onMouseEnter={() => setCurrentHover(index + 1)}
                onMouseLeave={() => setCurrentHover(null)}
                onClick={() => handleCurrentRating(index + 1)}
              />
            </span>
          ))}
        </span>
      </span>
      <span className="flex items-center group-hover:opacity-0 group-hover:w-0 bg-[#FCFCFC] rounded-[15px] text-[25px] ">
        <Star
          strokeWidth={0}
          fill={`${curentRating > 0 ? "#FEE58E" : "#D3D3D3"}`}
        />
      </span>
      <span className=" flex justify-center items-center text-[#303033] font-medium text-[14px] pr-1 ">
        {String(currentAverageStar)}
      </span>
    </div>
  );
};
export default StarRating;
