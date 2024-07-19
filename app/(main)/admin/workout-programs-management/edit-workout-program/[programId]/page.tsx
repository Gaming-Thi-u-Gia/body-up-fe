"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import EditWorkoutProgram from "./edit-workout-program";
const page = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN"){
  return (
    <div>
      <EditWorkoutProgram />
    </div>
  );}else{
    router.push("/")
  }
};

export default page;
