"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import CreateWorkoutProgram from "./create-workout-program";

const page = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN"){
  return (
    <div>
      <CreateWorkoutProgram />
    </div>
  );}else{
    router.push("/")
  }
};

export default page;
