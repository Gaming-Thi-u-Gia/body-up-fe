"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import EditWorkoutProgram from "./edit-workout-program";
const page = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role !== "ADMIN") router.push("/");
  return (
    <div>
      <EditWorkoutProgram />
    </div>
  );
};

export default page;
