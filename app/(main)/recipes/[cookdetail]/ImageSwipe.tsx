"use client";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
const ImageSwipe = ({ images }: { images: any }) => {
  return (
    <div>
      <Gallery>
        <div className="grid grid-cols-3 gap-1">
          {images.map((image, index) => (
            <div key={index} className="h-[1000px]">
              <Item
                original={image}
                thumbnail={image}
                width="1024"
                height="700"
              >
                {({ ref, open }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    ref={ref}
                    onClick={open}
                    src={image}
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

export default ImageSwipe;
