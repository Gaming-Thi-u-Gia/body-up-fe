import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

export const UserChallenges = () => {
    return (
        <>
            <div className='mt-6 w-full bg-[#fafafa] py-[52px] rounded-lg'>
                <div className='flex flex-col justify-center items-center'>
                    <Image
                        src='/profile-challenges-empty.svg'
                        alt='empty'
                        width={125}
                        height={125}
                    />
                    <p className='text-base text-[#868A93]'>
                        Challenges you attempt are displayed here. Start a
                        challenge or add previously completed ones in your
                        settings.
                    </p>
                </div>
            </div>
        </>
    );
};
