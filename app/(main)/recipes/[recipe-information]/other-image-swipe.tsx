"use client";

// eslint-disable-next-line @next/next/no-img-element
import { OtherImageSwipeType } from "@/utils/recipe/type";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const OtherImageSwipe = ({
  otherImageRecipes,
}: {
  otherImageRecipes: OtherImageSwipeType;
}) => {
  return (
    <div>
      <Gallery>
        <div className="grid grid-cols-3 gap-1">
          {otherImageRecipes.map((image, index) => (
            <div key={index} className="h-[1000px]">
              <Item
                original={image.img}
                thumbnail={image.img}
                width="1024"
                height="700"
              >
                {({ ref, open }) => (
                  <img
                    ref={ref}
                    onClick={open}
                    src={image.img}
                    alt="picture error"
                    className="object-cover h-[850px] w-full rounded-xl"
                  />
                )}
              </Item>
            </div>
          ))}
        </div>
      </Gallery>
    </div>
  );
};

export default OtherImageSwipe;
