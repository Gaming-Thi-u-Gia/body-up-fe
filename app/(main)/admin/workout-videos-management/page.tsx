"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import WorkoutVideoManagement from "./workout-video-management";

const page = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN") {
    return (
      <div>
        <WorkoutVideoManagement />
      </div>
    );
  } else {
    router.push("/");
  }
};

export default page;
