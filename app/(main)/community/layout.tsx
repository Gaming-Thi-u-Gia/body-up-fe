import React from "react";
import CommunityNavbar from "./community-nav";
import CommunitySideBar from "./community-sidebar";
import CommunityFilter from "./community-filter";
type Props = {
   children: React.ReactNode;
};

const layout = ({ children }: Props) => {
   return (
      <div className=" mt-[1.5px] w-full">
         <CommunityNavbar />
         <div className="bg-[#F9F9FA] flex relative">
            <div>
               <CommunitySideBar />
            </div>
            <div className="flex flex-col w-[45%] ml-[30%] mt-[4%]">
               <CommunityFilter />
               <div className="flex w-full justify-center items-center">
                  {children}
               </div>
            </div>
         </div>
         <div></div>
      </div>
   );
};

export default layout;
