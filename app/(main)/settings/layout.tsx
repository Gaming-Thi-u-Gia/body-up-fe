import React from "react";
import Sidebar from "./sidebar";
type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <div className="max-w-7xl flex items-center justify-center mx-auto">
      <div className=" w-full flex h-[calc(100vh-120px)]">
        <div className="hidden w-[20%] bg-transparent border-r border-gray-200/50 lg:flex ">
          <Sidebar />
        </div>
        <div className="w-[80%]">{children}</div>
      </div>
    </div>
  );
};

export default layout;
