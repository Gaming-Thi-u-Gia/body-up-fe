import { Sidebar } from "./sidebar";

type Props = {
    children: React.ReactNode;
};
const layout = ({ children }: Props) => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='mt-10 flex items-start gap-10'>
                <Sidebar />
                <div className='w-[72%]'>{children}</div>
            </div>
        </div>
    );
};

export default layout;
