"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import RecipeManagement from "./recipe-management";
const RecipeManagementPage = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN"){
  return (
    <div>
      <RecipeManagement />
    </div>
  );}else{
    router.push("/")
  }
};

export default RecipeManagementPage;
