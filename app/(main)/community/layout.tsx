import { Button } from "@/components/ui/button";
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
            <div className="bg-[#F9F9FA] flex">
                <CommunitySideBar />
                <div className="flex flex-col w-full ml-[213px] ">
                    <CommunityFilter />
                    <div className="flex w-full justify-center items-center pr-[5.7%]">
                        {children}
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default layout;
