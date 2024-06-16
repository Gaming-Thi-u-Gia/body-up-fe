"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { fetchSendRatingRecipe } from "@/utils/recipe";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type StarRatingType = {
  id: number;
  avgStar: Number;
  currentRating: number;
};
const StarRating = ({ id, avgStar, currentRating }: StarRatingType) => {
  const { sessionToken } = useAuthStore((store) => store);
  const [rating, setRating] = useState<number>(currentRating);
  const [averageStar, setAverageStar] = useState<Number>(avgStar);
  const [hover, setHover] = useState<null | number>(null);
  const handleRating = async (numberStar: number) => {
    try {
      const response = await fetchSendRatingRecipe(
        id,
        sessionToken!,
        numberStar
      );
      setRating(response.star);
      setAverageStar(response.avgStar);
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
                fill={`${(hover ?? rating) > index ? "#FEE58E" : "#D3D3D3"}`}
                strokeWidth={0}
                width={34}
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(null)}
                onClick={() => handleRating(index + 1)}
              />
            </span>
          ))}
        </span>
      </span>
      <span className="flex items-center group-hover:opacity-0 group-hover:w-0 bg-[#FCFCFC] rounded-[15px] text-[25px] ">
        <Star strokeWidth={0} fill={`${rating > 0 ? "#FEE58E" : "#D3D3D3"}`} />
      </span>
      <span className=" flex justify-center items-center text-[#303033] font-medium text-[14px] pr-1 ">
        {String(averageStar)}
      </span>
    </div>
  );
};
export default StarRating;
