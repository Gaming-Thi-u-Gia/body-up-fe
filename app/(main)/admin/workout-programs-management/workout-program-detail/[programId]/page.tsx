"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import WorkoutProgramDetail from "./workout-program-detail";

const page = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role !== "ADMIN") router.push("/");
  return (
    <div>
      <WorkoutProgramDetail />
    </div>
  );
};

export default page;
