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
    }, []);
    return (
        <>
            <div className='mt-6 w-full bg-[#fafafa] py-[52px] rounded-lg'>
                {challenges ? (
                    <div className='flex gap-4 flex-wrap'>
                        {challenges.map((challenge) => (
                            // @ts-ignore
                            <CardProgram
                                key={challenge.workoutProgram.id}
                                days={challenge.workoutProgram.day}
                                equipment={challenge.workoutProgram.equipment}
                                imgUrl={challenge.workoutProgram.img}
                                releaseDate={
                                    challenge.workoutProgram.releaseDate
                                }
                                time={challenge.workoutProgram.time}
                                title={challenge.workoutProgram.name}
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
