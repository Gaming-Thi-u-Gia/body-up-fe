"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import UserManagement from "./user-management";

const UserManagementPage = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role === "ADMIN"){
  return (
    <div>
      <UserManagement />
    </div>
  );}else{
    router.push("/")
  }
};

export default UserManagementPage;
