"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import AddVideo from "./add-video";

const page = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role !== "ADMIN") router.push("/");
  return (
    <div>
      <AddVideo />
    </div>
  );
};

export default page;
