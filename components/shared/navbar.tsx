"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { category } from "@/constants";

export const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className='bg-[#F7F7F7] border-b border-[#C4C4C4]'>
            <div className='max-w-7xl px-2 sm:px-6 lg:px-8 mx-auto '>
                <div className='h-[56px] flex justify-between items-center font-medium'>
                    <h3 className='font-bold text-[20px]'>BODY UP!!!</h3>
                    <ul className='flex justify-between items-center sm:items-stretch text-sm gap-6 h-full'>
                        {category.map((item) => (
                            <li
                                key={item.category}
                                className='flex flex-col items-center justify-center leading-[54px] relative'
                            >
                                <Link href={item.url}>{item.category}</Link>
                                <hr
                                    className={cn(
                                        `bg-[#303033] h-[2px] rounded-[10px] w-full absolute bottom-0`,
                                        pathname !== item.url && "hidden"
                                    )}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className='flex gap-2'>
                        <Button variant='default' size='sm'>
                            Sign up
                        </Button>
                        <Button variant='primary' size='sm'>
                            Log in
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
