import Link from "next/link";
import { SignupForm } from "./signup-form";

const SignUpPage = () => {
  return (
    <div className="w-[492px] py-2 px-3 mr-5">
      <h1 className="text-[35px] font-medium mb-2">
        Track Your Progress & More!
      </h1>
      <div className="flex items-center justify-between">
        <p className="text-sm">Start your fitness journey today</p>
        <Link
          href="/signup"
          className="border-[#303033] border-b-[1px] text-sm"
        >
          Existing user?
        </Link>
      </div>

      <SignupForm />
    </div>
  );
};

export default SignUpPage;
