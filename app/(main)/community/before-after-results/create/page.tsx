"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import back_Icon from "/public/back-icon.svg";
import CreatePost from "../../create-post";
import CreateBeforeAfterPost from "../../create-before-after-post";
const CreatePostBeforeAfter = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    return (
        <div className="w-[828px] mt-[5%]">
            <Link
                href={`/community/${title}`}
                className="flex gap-2 items-center justify-start mb-4"
            >
                <Image src={back_Icon} width={24} height={24} alt="back" />
                <span className="text-[15px] text-black flex gap-2 ">Back</span>
            </Link>
            <CreateBeforeAfterPost />
        </div>
    );
};

export default CreatePostBeforeAfter;
