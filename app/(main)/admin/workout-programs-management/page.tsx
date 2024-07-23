"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import ListWorkoutProgram from "./list-workout-program";

const ListWorkoutProgramPage = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN"){
  return (
    <div>
      <ListWorkoutProgram />
    </div>
  );}else{
    router.push("/")
  }
};

export default ListWorkoutProgramPage;
