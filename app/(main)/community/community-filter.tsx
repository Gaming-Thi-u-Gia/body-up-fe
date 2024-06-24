/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import {
    CreditCard,
    Keyboard,
    Settings,
    User,
    ChevronDown,
} from "lucide-react";
import { Utensils, Calendar } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const CommunityFilter = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const showFilter = pathParts.length <= 3;
    return (
        showFilter && (
            <nav className="flex ml-[22%] gap-3 w-[828px] mt-[70px] justify-between h-10">
                <div className="flex items-center justify-center gap-2">
                    <Button type="button" variant="primary" size="sm">
                        Latest
                    </Button>
                </div>
                <div className="flex items-center justify-center flex-end gap-2 cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center ">
                                <span className="text-sm">All</span>
                                <ChevronDown className="text-sm w-[18.72px]" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[180px] absolute mt-5"
                            side="left"
                        >
                            <DropdownMenuLabel className="bg-[#ebf4ff]">
                                All
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup className="text-sm flex flex-col font-light">
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Workout</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Utensils className="mr-2 h-4 w-4" />
                                    <span>Food</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>Chloe's Programs</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Keyboard className="mr-2 h-4 w-4" />
                                    <span>Misc</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        )
    );
};

export default CommunityFilter;
