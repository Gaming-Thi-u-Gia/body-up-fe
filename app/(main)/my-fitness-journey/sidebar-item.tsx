import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
    icon: string;
    title: string;
    href: string;
};
export const SidebarItem = ({ icon, title, href }: Props) => {
    const pathname = usePathname();
    return (
        <Link href={href}>
            <div
                className={cn(
                    "flex gap-4 items-center px-[15px] py-[9.5px] w-full hover:bg-[#e9e9e9af] rounded-md",
                    pathname === href && "bg-[#f1ebeb]"
                )}
            >
                <Image src={icon} alt='profile' width={18} height={18} />
                <p className='font-medium text-sm'>{title}</p>
            </div>
        </Link>
    );
};
