"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col gap-4 py-9 text-[#818181]">
      <nav className="h-full flex-col justify-between md:flex md:gap-4">
        <ul className="hidden w-full flex-col items-start gap-2 md:flex">
          <li
            className={cn(
              `flex w-full justify-center items-center font-bold text-[16px] leading-[140%] whitespace-nowrap bg-cover transition-all group`,
              pathname === "/settings/preferences" &&
                "bg-[#e6e4e4]/50 text-black border-r border-gray-300"
            )}
          >
            <Link
              className="font-normal text-[16px] leading-[140%] flex size-full gap-4 p-4"
              href="/settings/preferences"
            >
              Preferences
            </Link>
          </li>
          <li
            className={cn(
              `flex w-full justify-center items-center font-bold text-[16px] leading-[140%]  whitespace-nowrap bg-cover transition-all group`,
              pathname === "/settings/email-and-password" &&
                "bg-[#e6e4e4]/50 text-black border-r border-gray-300"
            )}
          >
            <Link
              className="font-normal text-[16px] leading-[140%] flex size-full gap-4 p-4"
              href="/settings/email-and-password"
            >
              Email & Password
            </Link>
          </li>
          <li
            className={cn(
              `flex w-full justify-center items-center font-bold text-[16px] leading-[140%] whitespace-nowrap bg-cover transition-all group`,
              pathname === "/settings/subscription" &&
                "bg-[#e6e4e4]/50 text-black border-r border-gray-300"
            )}
          >
            <Link
              className="font-normal text-[16px] leading-[140%] flex size-full gap-4 p-4"
              href="/settings/subscription"
            >
              Subscription
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
