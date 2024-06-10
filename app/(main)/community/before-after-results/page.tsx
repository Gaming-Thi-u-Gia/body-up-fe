import React from "react";
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
