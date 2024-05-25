import React from "react";

const HeaderInfoSort = ({
  title,
  detail,
}: {
  title: String;
  detail: String;
}) => {
  return (
    <>
      <div className="flex justify-between py-5">
        <div>
          <text className="text-[#303033] text-[22px] font-semibold leading-[30px]">
            {title}
          </text>
          <p className="text-[14px] font-normal leading-[140%] h-[50%]">
            {detail}
          </p>
        </div>
        <div>
          <div>
            <span>Most Current</span>
            <ul className="z-[1]">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderInfoSort;
