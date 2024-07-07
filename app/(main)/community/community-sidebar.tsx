"use client";
import { communityNavBack, communityNavLink } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const CommunitySideBar = () => {
    const pathname = usePathname();
    return (
        <div className=" flex fixed top-[110px] left-0 min-w-[333px] flex-col border-r border-gray-200 h-[calc(100vh-110px)] z-20">
            <div className="flex size-full flex-col gap-4 ">
                <nav className="flex-col md:flex md:gap-4 h-full">
                    <ul className="w-full flex-col items-start gap-2 flex flex-1">
                        {communityNavLink.map((link) => {
                            const isActive = link.route === pathname;
                            return (
                                <li
                                    key={link.route}
                                    className={` flex pl-3 justify-center items-center font-semibold text-[14px] h-[72px] w-full whitespace-nowrap bg-cover hover:bg-[#EDEBF9] group ${
                                        isActive
                                            ? "bg-[#EDEBF9] font-semibold shadow-md border-r-2 border-[#7065CD]"
                                            : "bg-transparent font-light"
                                    }`}
                                >
                                    <Link
                                        className="flex size-full gap-4 p-4 items-center"
                                        href={link.route}
                                    >
                                        <Image
                                            src={link.icon}
                                            width={24}
                                            height={24}
                                            alt="logo"
                                            className={`${
                                                isActive && "brightness-600"
                                            }`}
                                        />
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="flex w-full items-center h-[64.7px] py-3 border-t border-gray-200 relative">
                        {communityNavBack.map((link) => {
                            const isActives = link.route === pathname;
                            return (
                                <li
                                    key={link.route}
                                    className={`w-[25%] h-full flex items-center justify-center group ${
                                        isActives
                                            ? "rounded-full bg-[#EDEBF9]"
                                            : ""
                                    }`}
                                >
                                    <Link href={link.route}>
                                        <Image
                                            src={link.icon}
                                            width={24}
                                            height={24}
                                            alt="logo"
                                            className={`${
                                                isActives && " text-blue-500"
                                            }`}
                                        ></Image>
                                    </Link>
                                    <div className="hidden hover:bg-black hover:flex hover:text-white hover: width-full">
                                        {link.label}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default CommunitySideBar;
