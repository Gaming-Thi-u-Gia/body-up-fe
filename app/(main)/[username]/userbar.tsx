import { cn } from "@/lib/utils";

type Props = {
    page: string;
    onClick: (page: string) => void;
};
export const UserBar = ({ page, onClick }: Props) => {
    return (
        <div className='border-b border-[#E1E3F2]'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex gap-10 py-3'>
                    <p
                        className={cn(
                            "text-base cursor-pointer text-[#868A93] hover:text-[#303033]",
                            page === "photo" && "text-[#303033] font-bold"
                        )}
                        onClick={() => onClick("photo")}
                    >
                        Progress Photo
                    </p>
                    <p
                        className={cn(
                            "text-base cursor-pointer text-[#868A93] hover:text-[#303033]",
                            page === "challenges" && "text-[#303033] font-bold"
                        )}
                        onClick={() => onClick("challenges")}
                    >
                        Completed Challenges
                    </p>
                </div>
            </div>
        </div>
    );
};
