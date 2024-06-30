"use client";

import { useState, useEffect, useTransition } from "react";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
   InputOTP,
   InputOTPGroup,
   InputOTPSeparator,
   InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { useVerifyCode } from "@/stores/use-verify-models";
import { OtpSchema } from "@/schemas";
import { getAuth, handleVerifyCode } from "@/utils/auth";
import { useAuthStore } from "../providers/auth-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import useUserFirebaseStore from "@/stores/user-firebase-store";
// import { toast } from "sonner"
export const VerifyCodeModel = () => {
   const { login, updateProfile } = useAuthStore((store) => store);
   const { isOpen, close } = useVerifyCode((store) => store);
   const [isPending, startTransition] = useTransition();
   const router = useRouter();
   const { setUser, currentUser } = useUserFirebaseStore((store) => store);
   const form = useForm<z.infer<typeof OtpSchema>>({
      resolver: zodResolver(OtpSchema),
      defaultValues: {
         pin: "",
      },
   });

   async function onSubmit(data: z.infer<typeof OtpSchema>) {
      startTransition(async () => {
         try {
            const result = await handleVerifyCode(data);
            const user = await getAuth(result.payload.res.token);
            login(result.payload.res.token);
            if (result.status === 200) {
               const res = await createUserWithEmailAndPassword(
                  auth,
                  user?.payload.email,
                  user?.payload.password
               );
               const username = user?.payload.email.split("@")[0];
               await setDoc(doc(db, "users", res.user.uid), {
                  username,
                  avatar: null,
                  email: user?.payload.email,
                  id: res.user.uid,
                  blocked: [],
               });
               await setDoc(doc(db, "userchats", res.user.uid), {
                  chat: [],
               });
               await signInWithEmailAndPassword(
                  auth,
                  user?.payload.email,
                  user?.payload.password
               );
               setUser({
                  id: res.user.uid,
                  username,
                  email: user?.payload.email,
               });
            }

            updateProfile(user?.payload);
            toast.success("Verify code successfuly!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });
            router.push("/program");
            close();
         } catch (error) {
            toast.error("Invalid verify code!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });
         }
      });
   }

   const [client, setClient] = useState(false);
   useEffect(() => {
      setClient(true);
   }, []);
   if (!client) {
      return null;
   }

   return (
      <Dialog open={isOpen} onOpenChange={close}>
         <DialogContent className="max-w-md">
            <DialogHeader>
               <div className="flex items-center w-full justify-center mb-5">
                  Comfirm your verify code
               </div>
               <DialogTitle>Your code:</DialogTitle>
            </DialogHeader>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-2/3 space-y-6"
               >
                  <FormField
                     control={form.control}
                     name="pin"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>One-Time Code</FormLabel>
                           <FormControl>
                              <InputOTP maxLength={6} {...field}>
                                 <InputOTPGroup>
                                    <InputOTPSlot index={0} />

                                    <InputOTPSlot index={1} />

                                    <InputOTPSlot index={2} />

                                    <InputOTPSlot index={3} />

                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                 </InputOTPGroup>
                              </InputOTP>
                           </FormControl>
                           <FormDescription>
                              Please enter the one-time code sent to your Email.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button variant="primary" disabled={isPending}>
                     Submit
                  </Button>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};
