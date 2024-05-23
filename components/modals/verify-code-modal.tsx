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
import { handleVerifyCode } from "@/utils/auth";
// import { toast } from "sonner"
export const VerifyCodeModel = () => {
    const { isOpen, close } = useVerifyCode((store) => store);

    const form = useForm<z.infer<typeof OtpSchema>>({
        resolver: zodResolver(OtpSchema),
        defaultValues: {
            pin: "",
        },
    });
    async function onSubmit(data: z.infer<typeof OtpSchema>) {
        try {
            const res = await handleVerifyCode(data);
            if (res) {
                close();
            }
            console.log(res);
            console.log(data);
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
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
                                        Please enter the one-time code sent to
                                        your Email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button variant="primary">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
