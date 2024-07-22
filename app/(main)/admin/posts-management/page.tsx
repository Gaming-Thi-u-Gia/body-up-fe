"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import PostManagement from "./post-management";

const PostsManagementsPage = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN"){
  return (
    <div>
      <PostManagement />
    </div>
  );}else{
    router.push("/")
  }
};

export default PostsManagementsPage;
