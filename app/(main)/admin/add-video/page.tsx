"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import AddVideo from "./add-video";

const AddVideoPage = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN"){
  return (
    <div>
      <AddVideo />
    </div>
  );}else{
    router.push("/")
  }
};

export default AddVideoPage;
