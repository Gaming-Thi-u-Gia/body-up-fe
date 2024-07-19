"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/router";
import RecipeManagement from "./recipe-management";
const page = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role !== "ADMIN") router.push("/");
  return (
    <div>
      <RecipeManagement />
    </div>
  );
};

export default page;
