import { Badge } from "@/components/ui/badge";
import { url } from "inspector";
import { Calendar, Clock } from "lucide-react";

type Props = {
    title: string;
    releaseDate: string;
    days: string;
    time: string;
    type: string;
    equipment: string;
    imgUrl: string;
};
export const CardProgram = ({
    title,
    releaseDate,
    days,
    time,
    type,
    equipment,
    imgUrl,
}: Props) => {
    const date = new Date(releaseDate).toLocaleDateString("vi-VN");
    return (
        <div className='w-[232px] border-[1px] border-[#eff0f4] rounded-[20px] cursor-pointer'>
            <div
                className='bg-cover pb-[114%] rounded-2xl group relative overflow-hidden'
                style={{ backgroundImage: `url(${imgUrl})` }}
            >
                <div className='bg-black opacity-0 absolute left-0 bottom-0 right-0 top-0 z-1 group-hover:opacity-40 transition-all duration-300' />
                <div className='absolute -bottom-20 group-hover:bottom-16 left-3 transition-all z-20 duration-300'>
                    <div className='mb-2'>
                        <p className='text-gray-200 font-bold text-[10px]'>
                            TYPE
                        </p>
                        <h4 className='text-white font-semibold text-sm'>
                            {type}
                        </h4>
                    </div>
                    <div>
                        <p className='text-gray-200 font-bold text-[10px]'>
                            EQUIPMENT
                        </p>
                        <h4 className='text-white font-semibold text-sm'>
                            {equipment}
                        </h4>
                    </div>
                </div>
                <div className='absolute flex bottom-2 left-2 right-2 justify-between'>
                    <Badge
                        variant='secondary'
                        className='text-[#303033] text-xs space-x-1 py-1 px-2'
                    >
                        <Calendar width={16} height={16} />
                        <p>{days}</p>
                    </Badge>
                    <Badge
                        variant='secondary'
                        className='text-[#303033] text-xs space-x-1 py-1 px-2'
                    >
                        <Clock width={16} height={16} />
                        <p>{time}</p>
                    </Badge>
                </div>
            </div>
            <div className='p-5'>
                <h5 className='text-[#868A93] text-xs font-bold mb-[6px]'>
                    {date}
                </h5>
                <h4 className='text-lg font-semibold'>{title}</h4>
            </div>
        </div>
    );
};
