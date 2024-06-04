"use client";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
type Props = {
  images: any[];
};
const ImageSwipe = ({ images }: Props) => {
  return (
    <div>
      <Gallery>
        <div className="grid grid-cols-3 gap-1">
          {images.map((image, index) => (
            <div key={index}>
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
