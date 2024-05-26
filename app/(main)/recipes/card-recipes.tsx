/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Star from "./star-rating";

const CardRecipe = ({
  index,
  img,
  dietary,
  title,
  avgStar,
}: {
  index: number;
  img: string;
  dietary: [];
  title: string;
  avgStar: number;
}) => {
  const initialName = (name = "") => {
    const words = name.trim().split(" ");
    const initials = words.map((word) => word.charAt(0));
    return initials.join("").substring(0, 2);
  };
  return (
    <>
      <div
        key={index}
        className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px]"
      >
        <div className="relative h-full">
          <img
            className="h-[87%] w-full rounded-[15px] object-cover"
            src={img}
            alt="Recipe image"
          />
          <div className="absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse w-[32px]">
            {dietary.map((dietary, index) => (
              <Button
                className="my-1"
                key={index}
                variant="secondary"
                size="icon"
              >
                <a href="#">{initialName(dietary)}</a>
              </Button>
            ))}
          </div>
          <div className="flex w-full justify-between items-center absolute top-3 px-5">
            <Star avgStar={avgStar} />
            <div className="flex">
              <Button className="mr-4" variant="secondary" size="icon">
                <Image width={20} height={20} src="/add.svg" alt="add" />
              </Button>
              <Button variant="secondary" size="icon">
                <Image width={24} height={25} src="/heart.svg" alt="heart" />
              </Button>
            </div>
          </div>
          <p className="text-[18px]  font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center ">
            {title}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardRecipe;
