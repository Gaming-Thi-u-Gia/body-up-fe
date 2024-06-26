"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const CommunityNavbar = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    return (
        <div className="w-full fixed top-15 left-0 z-20 bg-[#F9F9FA] h-[57px] flex items-center border-b border-gray-200/100 ">
            <div className="w-[333px] flex items-center pr-[200px] pl-[15px] border-r border-gray-200/100 h-[57px]">
                <h1 className="text-[#303033] font-lg font-bold text-[20px] ">
                    Community
                </h1>
            </div>
            <div className="flex items-center flex-row justify-between w-[828px] h-[34px] ml-[12.7%]">
                <h1 className="font-bold text-sm text-black">#{title}</h1>
                <div className="flex gap-5">
                    <div className="flex items-center text-black cursor-pointer gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                        >
                            <path
                                d="M9.21777 1.875C8.30631 1.875 7.45345 2.04427 6.65918 2.38281C5.86491 2.73438 5.17155 3.20638 4.5791 3.79883C3.98665 4.39128 3.51465 5.08464 3.16309 5.87891C2.82454 6.67318 2.65527 7.52604 2.65527 8.4375C2.65527 9.34896 2.82454 10.2018 3.16309 10.9961C3.51465 11.7904 3.98665 12.4837 4.5791 13.0762C5.17155 13.6686 5.86491 14.1406 6.65918 14.4922C7.45345 14.8307 8.30631 15 9.21777 15C10.012 15 10.764 14.8665 11.4736 14.5996C12.1833 14.3327 12.8245 13.9648 13.3975 13.4961L17.8311 17.9492C17.8962 18.0013 17.9678 18.0436 18.0459 18.0762C18.124 18.1087 18.2021 18.125 18.2803 18.125C18.3584 18.125 18.4365 18.1087 18.5146 18.0762C18.5928 18.0436 18.6644 18.0013 18.7295 17.9492C18.7816 17.8841 18.8239 17.8125 18.8564 17.7344C18.889 17.6562 18.9053 17.5781 18.9053 17.5C18.9053 17.4219 18.889 17.3438 18.8564 17.2656C18.8239 17.1875 18.7816 17.1159 18.7295 17.0508L14.2764 12.6172C14.7581 12.0312 15.1292 11.3802 15.3896 10.6641C15.6501 9.94792 15.7803 9.20573 15.7803 8.4375C15.7803 7.52604 15.611 6.67318 15.2725 5.87891C14.9209 5.08464 14.4489 4.39128 13.8564 3.79883C13.264 3.20638 12.5706 2.73438 11.7764 2.38281C10.9821 2.04427 10.1292 1.875 9.21777 1.875ZM3.90527 8.4375C3.90527 7.73438 4.03874 7.05729 4.30566 6.40625C4.57259 5.75521 4.95996 5.18229 5.46777 4.6875C5.96257 4.17969 6.53548 3.79232 7.18652 3.52539C7.83756 3.25846 8.51465 3.125 9.21777 3.125C9.9209 3.125 10.598 3.25846 11.249 3.52539C11.9001 3.79232 12.473 4.17969 12.9678 4.6875C13.4756 5.18229 13.863 5.75521 14.1299 6.40625C14.3968 7.05729 14.5303 7.73438 14.5303 8.4375C14.5303 9.14062 14.3968 9.81771 14.1299 10.4688C13.863 11.1198 13.4756 11.6927 12.9678 12.1875C12.473 12.6953 11.9001 13.0827 11.249 13.3496C10.598 13.6165 9.9209 13.75 9.21777 13.75C8.51465 13.75 7.83756 13.6165 7.18652 13.3496C6.53548 13.0827 5.96257 12.6953 5.46777 12.1875C4.95996 11.6927 4.57259 11.1198 4.30566 10.4688C4.03874 9.81771 3.90527 9.14062 3.90527 8.4375Z"
                                fill="#303033"
                            />
                        </svg>
                        <span className="text-sm">Search</span>
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
