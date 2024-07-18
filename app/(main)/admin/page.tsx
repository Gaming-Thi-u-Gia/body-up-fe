"use client";
import React from "react";
import Dashboard from "./dashboard";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
const page = () => {
  const { user } = useAuthStore((store) => store);
  const router = useRouter();
  if (user?.role !== "ADMIN") router.push("/");
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default page;
