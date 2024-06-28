import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

type Props = {
    title: string;
    releaseDate: string;
    days: string;
    time: string;
    type: string;
    equipment: string;
};
export const CardProgram = ({
    title,
    releaseDate,
    days,
    time,
    type,
    equipment,
}: Props) => {
    return (
        <div className='w-[232px] border-[1px] border-[#eff0f4] rounded-[20px] cursor-pointer'>
            <div className='bg-[url("https://s3-alpha-sig.figma.com/img/a624/c261/80c5cc3c68778315c7766040e9d401b5?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CV3LCPYKTQ9IuasI3uB5xsiyN3zuo~RlODDgQQ5~Bop1Aakih1KAuXGX1Ffbew1iGMgcmEZpdz7qiD2zA~yT4gloSSLNl2EFfv8AYdSaCXEswfG~JSaMxejQbD6gWy8qYH4M1gJjnLb0msPuHHWbh-H2WeBGs40EgdesS54vyNb15hME-TDexpyII5uRwZQLaJVgb2czhlN-Og3iwxb0C6gKDIgj3BjIvcshVbaXthBJoeJ9ZKMTd4C-kncxvceqyjhUtjgdHkbyXEqdzNzbZMGFW43gpWju35saBrHgQHyPrAdmKurUaUi94eiWXpg4a2eOrRTewERbuwNxAEHsPA__")] bg-cover pb-[114%] rounded-2xl group relative overflow-hidden'>
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
                        <p>{days} days</p>
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
                    {releaseDate}
                </h5>
                <h4 className='text-lg font-semibold'>{title}</h4>
            </div>
        </div>
    );
};
