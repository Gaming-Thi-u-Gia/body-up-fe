import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { cn } from "@/lib/utils";
import { AuthStoreProvider } from "@/components/providers/auth-provider";
import { cookies } from "next/headers";
import { AvatarModal } from "@/components/modals/avatar-modal";
import { getAuth } from "@/utils/auth";
import { DeleteAvatarModal } from "@/components/modals/delete-avatar-modal";
import { Toaster } from "@/components/ui/sonner";
import { VerifyCodeModel } from "@/components/modals/verify-code-modal";
import { VerifyResetCodeModel } from "@/components/modals/verify-reset-code-modal";
import logo from "@/public/Logo_BODYUP.png";
const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
    title: "BODY UP",
    description: "Generated by create next app",
    icons: "/favicon.ico",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userCookie = cookies().get("sessionToken");
  const googleCookie = cookies().get("googleToken");
  let res;
  if (userCookie) {
    res = await getAuth(userCookie.value);
  }

  return (
    <html lang="en">
      <body className={cn("flex flex-col min-h-screen", font.className)}>
        <AuthStoreProvider
          initialToken={userCookie?.value}
          initialLoggedIn={!!userCookie?.value}
          initialUser={res?.payload}
        >
          <Navbar />
          <main className="mt-[56px] flex-1">
            <VerifyCodeModel />
            <VerifyResetCodeModel />
            <AvatarModal />
            <DeleteAvatarModal />
            {children}
          </main>

          <Toaster position="top-right" />
          <Footer />
        </AuthStoreProvider>
      </body>
    </html>
  );
}
