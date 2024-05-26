/* eslint-disable @next/next/no-img-element */
import React from "react";
import HeaderInfoSearch from "./header-info-viewall";

const PopularCategories = () => {
  const popularCategories = [
    {
      title: "Hight protein",
      imgURL:
        "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg",
      amount: 10,
    },
    {
      title: "Hight protein",
      imgURL:
        "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg",
      amount: 10,
    },
    {
      title: "Hight protein",
      imgURL:
        "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg",
      amount: 10,
    },
    {
      title: "Hight protein",
      imgURL:
        "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg",
      amount: 10,
    },
  ];
  return (
    <div>
      <HeaderInfoSearch title="Popular Categories" detail="" />
      <div>
        <div className="grid grid-cols-4 gap-5 h-[95px] box-border my-5">
          {popularCategories.map((category, index) => (
            <div
              key={index}
              className="flex h-full items-center bg-white rounded-[15px] border border-[#EFF0F4]  cursor-pointer "
            >
              <img
                className="h-full w-[95px] rounded-[15px] object-cover"
                src={category.imgURL}
                alt="pupular food"
              />
              <div className="flex-1 pl-2">
                <p className="text-[#303033] text-[18px] font-medium leading-[140%] pb-1 ">
                  {category.title}
                </p>
                <p className="text-[14px] font-normal leading-[140%]">
                  {category.amount} recipes
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
