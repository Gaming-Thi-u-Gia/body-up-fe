"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import AddRecipe from "./add-recipe";

const page = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN"){
  return (
    <div>
      <AddRecipe />
    </div>
  );}else{
    router.push("/")
  }
};

export default page;
