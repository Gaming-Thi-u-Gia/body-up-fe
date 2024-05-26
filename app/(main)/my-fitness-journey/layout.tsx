import { Sidebar } from "./sidebar";

type Props = {
    children: React.ReactNode;
};
const layout = ({ children }: Props) => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='mt-10 flex items-center justify-between'>
                <Sidebar />
                {children}
            </div>
        </div>
    );
};

export default layout;
