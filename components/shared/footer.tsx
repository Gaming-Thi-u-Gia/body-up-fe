import React from "react";
import { footerItems, socialMedia } from "@/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
export const Footer = () => {
    return (
        <footer className='h-[32px] py-[31.5px] border-t border-t-[#C4C4C4] z-50'>
            <div className='max-w-7xl mx-auto flex items-center justify-between h-full'>
                <h3 className='text-sm'>© 2024 Body Up!!!</h3>
                <ul className='flex gap-24 text-sm'>
                    {footerItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.url}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <ul className='flex gap-3'>
                    {socialMedia.map((item) => (
                        <li key={item.name}>
                            <Button
                                variant='primaryOutline'
                                size='icon'
                                asChild
                            >
                                <Link href={item.url}>
                                    <Image
                                        src={item.iconSrc}
                                        alt={item.name}
                                        width={16}
                                        height={16}
                                    />
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};
