import Link from "next/link";
import React from "react";
import ProgramCard from "./program-card";
import ProgramTitle from "./program-title";
const CatelogyModelProgram = () => {
    return (
        <div>
            <ProgramTitle/>
            <div className="grid grid-cols-5 gap-4 h-[430px]">
                <ProgramCard/>
                <ProgramCard/>
                <ProgramCard/>
                <ProgramCard/>
                <ProgramCard/>
            </div>
        </div>
    );
};
export default CatelogyModelProgram;
