import { Calendar, CalendarCheck, Clock4, Ellipsis } from "lucide-react";
import { release } from "os";
import React from "react";

interface ProgramCardProps {
    id: number;
    key: number;
    name: string;
    type: string;
    equipment: string;
    detail: string;
    day: string;
    time: string;
    year: string;
    img: string;
    releaseDATE: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ id, key, name, type, equipment, day, time, year, img, releaseDATE }) => {
    console.log(img);
    return (
        <div className="flex-col bg-white rounded-2xl">
            <div className="relative overflow-hidden">
                <img
                    src={img}
                    alt={name}
                    className="rounded-2xl cursor-pointer hover:opacity-70"
                    style={{ height: "auto", width: "100%" }}
                />
                <div className="absolute inset-0 flex items-center bg-gray-500 bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                    <div className="flex-row">
                        <div className="mx-2 py-1">
                            <h3 className="text-xs font-medium">TYPE</h3>
                            <p className="text-[15px] leading-tight font-medium text-slate-500">
                                {type}
                            </p>
                        </div>
                        <div className="mx-2 py-1">
                            <h3 className="text-xs font-medium">EQUIPMENT</h3>
                            <p className="text-[15px] leading-tight font-medium text-slate-500">
                                {equipment}
                            </p>
                        </div>
                        <div className="mx-2 py-1">
                            <h3 className="text-xs font-medium">RELEASE DATE</h3>
                            <p className="text-[15px] leading-tight font-medium text-slate-500">
                                {releaseDATE}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-1 my-4 mx-2">
                <div className="flex gap-1 text-center items-center px-3 py-2 rounded-full bg-[#F7F7F7]">
                    <Calendar width={16} height={16} />
                    <span className="text-[12px]">{day} </span>
                </div>
                <div className="flex gap-1 text-center items-center px-3 py-1 rounded-full bg-[#F7F7F7]">
                    <Clock4 width={16} height={16} />
                    <span className="text-[12px]">{time}</span>
                </div>
            </div>
            <div className="flex flex-wrap items-center">
                <span className="text-[18px] leading-6 font-medium mx-5 pb-2">
                    {name}
                </span>
            </div>
        </div>
    );
};

export default ProgramCard;
