import { useAuthStore } from "@/components/providers/auth-provider";
import { getAllCompleted } from "@/utils/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CardProgram } from "../my-fitness-journey/card-program";

export const UserChallenges = () => {
    const [challenges, setChallenges] = useState([]);
    const { sessionToken } = useAuthStore((state) => state);
    useEffect(() => {
        // fetch challenges
        const getAllChallenges = async () => {
            const res = await getAllCompleted(sessionToken!);
            setChallenges(res);
        };
        getAllChallenges();
    }, [sessionToken]);
    return (
        <>
            <div className='mt-6 w-full bg-[#fafafa] py-[52px] rounded-lg'>
                {challenges ? (
                    <div className='flex gap-4 flex-wrap'>
                        {challenges.map((challenge) => (
                            <CardProgram
                                // @ts-ignore
                                key={challenge.workoutProgram.id}
                                // @ts-ignore

                                days={challenge.workoutProgram.day}
                                // @ts-ignore
                                equipment={challenge.workoutProgram.equipment}
                                // @ts-ignore
                                imgUrl={challenge.workoutProgram.img}
                                releaseDate={
                                    // @ts-ignore
                                    challenge.workoutProgram.releaseDate
                                }
                                // @ts-ignore
                                time={challenge.workoutProgram.time}
                                // @ts-ignore
                                title={challenge.workoutProgram.name}
                                // @ts-ignore
                                type={challenge.workoutProgram.type}
                            />
                        ))}
                    </div>
                ) : (
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
                )}
            </div>
        </>
    );
};
