import { title } from "process";
import Slider from "./slider";
import Info from "./info";
import CookInfo from "./cook-info";
import ImageSwipe from "./image-swipe";
import Recommended from "./recommend";
/* eslint-disable @next/next/no-img-element */
type Props = {
  params: {
    foodName: string;
  };
};
const CookDetail = ({ params }: Props) => {
  const { foodName } = params;

  const images = [
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
  ];

  return (
    <div>
      <Slider foodName={foodName} />
      <Info />
      <CookInfo />
      <ImageSwipe images={images} />
      <Recommended />
    </div>
  );
};

export default CookDetail;
