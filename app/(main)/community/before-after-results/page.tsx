import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import defaultProfile from "/public/default-iProfile.png";
import before_after from "/public/before-after-icon.svg";
import { Button } from "@/components/ui/button";
import challenges_icon from "/public/challenges-icon.svg";
import BeforAfterPost from "../before-after-card";
const BeforeAfterResultPage = () => {
    return (
        <div className="w-[823px] mt-3">
            <div className="w-full grid grid-cols-2 gap-4">
                <BeforAfterPost />
                <BeforAfterPost />
                <BeforAfterPost />
                <BeforAfterPost />
                <BeforAfterPost />
                <BeforAfterPost />
            </div>
        </div>
    );
};

export default BeforeAfterResultPage;
