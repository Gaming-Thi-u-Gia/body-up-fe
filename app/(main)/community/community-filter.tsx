import React from "react";
import {
    CreditCard,
    Keyboard,
    Settings,
    User,
    ChevronDown,
} from "lucide-react";

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

const CommunityFilter = () => {
    return (
        <nav className="flex ml-[22%] gap-3 w-[828px] mt-[70px] justify-between h-10">
            <div className="flex items-center justify-center gap-2">
                <Button type="button" variant="primary" size="sm">
                    Latest
                </Button>
                <Button type="button" variant="default" size="sm">
                    Last Active
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
                        className="w-40 absolute mt-5 "
                        side="left"
                    >
                        <DropdownMenuLabel className="bg-blue-200">
                            All
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Workout</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Food</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
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
    );
};

export default CommunityFilter;
