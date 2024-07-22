"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import WorkoutProgramDetail from "./workout-program-detail";

const WorkoutProgramDetailPage = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN"){
  return (
    <div>
      <WorkoutProgramDetail />
    </div>
  );}else{
    router.push("/")
  }
};

export default WorkoutProgramDetailPage;
