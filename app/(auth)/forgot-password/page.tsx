import React from "react";
import { ForgotPasswordForm } from "./forgot-password-form";

const ForgotPasswordPage = () => {
    return (
        <div className="w-[492px] py-2 px-3 mr-5">
            <h1 className="text-[35px] font-medium mb-2">Recovery Password</h1>
            <div className="flex items-center justify-between">
                <p className="text-sm">Enter your email address below.</p>
            </div>
            <ForgotPasswordForm />
        </div>
    );
};

export default ForgotPasswordPage;
