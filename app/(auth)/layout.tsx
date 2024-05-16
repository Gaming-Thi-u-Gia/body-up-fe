import React from "react";
import { FeatureSticker } from "./feature-sticker";
type Props = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
    return (
        <div className='w-full flex h-[calc(100vh-120px)]'>
            <div className='w-[60%] h-full flex items-center justify-center'>{children}</div>
            <FeatureSticker />
        </div>
    );
};

export default AuthLayout;
