import Image from "next/image";
import React from "react";

type Props = {
  backGround: any;
  strong: any;
  text: any;
  img: any;
};
//@ts-ignore
const Feature = ({ backGround, strong, text, img }: Props) => {
  return (
    <div
      className={`w-[540px] ${backGround} bg-no-repeat h-[135px] max-h-[160px] relative mb-3 rounded-lg `}
    >
      <div className="w-[60%] py-[30px] px-[20px]">
        <strong>{strong}</strong>
        <p>{text}</p>
      </div>
      <Image src={img} alt="" className="w-[37%] absolute bottom-0 right-2" />
    </div>
  );
};

export default Feature;
