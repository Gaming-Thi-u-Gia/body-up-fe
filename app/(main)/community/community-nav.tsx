"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const CommunityNavbar = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    const router = useRouter();
    return (
        <div className="w-full fixed top-15 left-0 z-20 bg-[#F9F9FA] h-[57px] flex items-center border-b border-gray-200/100 ">
            <div className="w-[333px] flex items-center pr-[200px] pl-[15px] border-r border-gray-200/100 h-[57px]">
                <h1 className="text-[#303033] font-lg font-bold text-[20px] ">
                    Community
                </h1>
            </div>
            <div className="flex items-center flex-row justify-between w-[828px] h-[34px] ml-[12.7%]">
                <h1 className="font-bold text-sm text-black">#{title}</h1>
                <div className="flex gap-2">
                    <div className="group inline-flex h-[29px] px-[17px] ml-3">
                        <span className="group-hover:opacity-0 group-hover:invisible transition-opacity duration-500 ease-in-out">
                            <Button
                                variant="defaultOutline"
                                size="default"
                                className="flex gap-1"
                            >
                                <Search
                                    strokeWidth={1}
                                    width={20}
                                    height={20}
                                />
                                <span>Search</span>
                            </Button>
                        </span>
                        <span
                            onMouseEnter={(e) =>
                                e.currentTarget.querySelector("input")?.focus()
                            }
                            className="relative inline-flex group-hover:w-[240px] items-center group-hover:opacity-100 transition-all ease-in-out duration-1000 h-full rounded-[15px] w-0 opacity-0"
                        >
                            <Search
                                strokeWidth={1}
                                width={20}
                                height={20}
                                className="absolute left-[2px] cursor-pointer"
                            />
                            <input
                                className="pl-7 w-full rounded-[15px] border-1 border-gray-200/100"
                                placeholder="Search"
                            />
                        </span>
                    </div>
                    {title === "saved-posts" ||
                    title === "my-posts" ||
                    title === "my-comments" ? (
                        <div></div>
                    ) : (
                        <Link href={`/community/${title}/create`}>
                            <Button
                                type="submit"
                                variant="primary"
                                size="full"
                                className="h-[29px] px-[17px] text-sm"
                            >
                                Create Post
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityNavbar;
