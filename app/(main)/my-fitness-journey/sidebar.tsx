"use client";

import Image from "next/image";

import { useAuthStore } from "@/components/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { myFitness } from "@/constants";
import { Button } from "@/components/ui/button";

import { SidebarItem } from "./sidebar-item";
import defaultProfile from "/public/default-iProfile.png";

export const Sidebar = () => {
    const { user } = useAuthStore((state) => state);
    return (
        <div className='bg-white border-[#E9E9EF] border w-[25%] rounded-2xl'>
            <div className='flex pb-0 p-[30px] gap-4'>
                <div>
                    <Image
                        src={user?.avatar! || defaultProfile}
                        alt='User avatar'
                        width={50}
                        height={50}
                        className='rounded-full'
                    />
                    <Badge variant='secondary' className='mt-2 w-[50px]'>
                        70 AP
                    </Badge>
                </div>
                <h4 className='font-bold mt-3 truncate'>
                    {user?.firstName} {user?.lastName}
                </h4>
            </div>
            <div className='flex flex-col p-5'>
                <SidebarItem
                    href={`/${user?.userName2}`}
                    icon='/user-icon.svg'
                    title='My Profile'
                />
            </div>
            <Separator />
            <div className='flex flex-col p-5'>
                <SidebarItem
                    href='/my-fitness-journey'
                    icon='/schedule-icon.svg'
                    title='My Schedule'
                />
                <SidebarItem href='#' icon='/team-icon.svg' title='My Team' />
            </div>
            <Separator />
            <div className='flex flex-col p-5'>
                {myFitness.map((item) => (
                    <SidebarItem
                        href={"/my-fitness-journey" + item.url}
                        title={item.name}
                        key={item.name}
                        icon={item.icon}
                    />
                ))}
            </div>
            <div className='flex flex-col p-5'>
                <div className="bg-[url('/upgrade-account-badge.png')] w-full relative p-5 rounded-lg">
                    <div className='flex items-center justify-between mb-2'>
                        <Button
                            variant='primary'
                            className='font-medium text-xs'
                            size='smP4'
                        >
                            UPGRADE
                        </Button>
                        <Image
                            src='/upgrade-shield.png'
                            alt='upgrade-shield'
                            width={35}
                            height={35}
                        />
                    </div>
                    <div>
                        <h4 className='text-sm my-1'>Upgrade Your Account</h4>
                        <p className='text-xs'>
                            Remove ads, influence upcoming features, get access
                            to premium features and more
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
