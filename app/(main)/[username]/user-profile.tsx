"use client";
import React, { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/components/providers/auth-provider";

import { UserChallenges } from "./user-challenges";
import { UserProgressPhoto } from "./user-progress-photo";
import { UserBar } from "./userbar";
import defaultProfile from "/public/default-iProfile.png";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { getUserByUserName2 } from "@/utils/user";
import { set } from "zod";
import { UserState } from "@/stores/auth-store";
const photoAngle = [
    {
        type: "all",
        title: "All",
    },
    {
        type: "front",
        title: "Front Angle",
    },
    {
        type: "side",
        title: "Side Angle",
    },
    {
        type: "back",
        title: "Back Angle",
    },
];
export const UserProfile = () => {
    const username = usePathname().split("/")[1];
    const { user: initUser } = useAuthStore((state) => state);
    const [angle, setAngle] = useState("all");
    const [user, setUser] = useState<UserState>();
    const [page, setPage] = useState("photo");
    const onClick = (page: string) => setPage(page);
    const onClickAngle = (angle: string) => setAngle(angle);
    const onCopy = () => {
        navigator.clipboard.writeText(
            process.env.NEXT_PUBLIC_DOMAIN + "/" + username
        );
        toast.success("Copied to clipboard");
    };
    useEffect(() => {
        const getUser = async () => {
            const res = await getUserByUserName2(username);
            console.log(res.payload);
            setUser(res.payload);
        };
        getUser();
    }, [username]);
    return (
        <>
            <div className='max-w-7xl mx-auto py-[55px]'>
                <div className='flex w-[1280px]'>
                    <Image
                        src={user?.avatar! || defaultProfile}
                        alt='avatar'
                        width={135}
                        height={135}
                        className='rounded-full'
                    />
                    <div className='ml-8 flex-1'>
                        <h4 className='text-4xl font-semibold'>
                            {user?.firstName} {user?.lastName}
                        </h4>
                        <div className='flex gap-2 items-center mt-2'>
                            <p className='text-xs text-[#868A93] font-bold uppercase'>
                                bodyup.com/{username}
                            </p>
                            <Copy
                                width={14}
                                height={14}
                                className='text-[#868A93] hover:text-black'
                                onClick={onCopy}
                                cursor='pointer'
                            />
                        </div>
                        <div className='flex gap-3'>
                            <div className='bg-[#E3E4EB] text-[#303033] text-xs px-3 py-[6px] rounded-lg mt-1'>
                                2 Completed Challenges
                            </div>
                            <div className='bg-[#E3E4EB] text-[#303033] text-xs px-3 py-[6px] rounded-lg mt-1'>
                                80 Achievement Points
                            </div>
                        </div>
                    </div>
                    {initUser?.userName2 === username && (
                        <Button variant='primaryOutline'>
                            <Link href='/settings/preferences'>
                                Preferences
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
            <div className='flex-1 bg-[#FFFFFF]'>
                <UserBar page={page} onClick={onClick} />
                <div className='max-w-7xl mx-auto mt-4 min-h-[500px]'>
                    {page === "photo" && (
                        <UserProgressPhoto
                            photoAngle={photoAngle}
                            onClick={onClickAngle}
                            angle={angle}
                            userId={user?.id!}
                        />
                    )}
                    {page === "challenges" && <UserChallenges />}
                </div>
            </div>
        </>
    );
};
