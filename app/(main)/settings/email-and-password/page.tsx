"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordSchema } from "@/schemas";
import { handleChangePassword, handleSetNewPassword } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const EmailPassword = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { sessionToken } = useAuthStore((state) => state);
    const form = useForm({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });
    const onSubmit = (data: z.infer<typeof ChangePasswordSchema>) => {
        startTransition(async () => {
            try {
                const res = await handleChangePassword(data, sessionToken!);
                toast.success("Change password successfully!!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
            } catch (error) {
                toast.error("Something went wrong!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
                console.log(error);
            }
        });
    };
    return (
        <div className='w-[604px] shrink-0 flex flex-col m-[64px] py-5'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-5 mt-2'
                >
                    <div className='space-y-3'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='New Password'
                                            className='bg-transparent hover:ring-1 hover:ring-black'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='Confirm Your Password'
                                            className='bg-transparent hover:ring-1 hover:ring-black'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    <Button
                        type='submit'
                        variant='primary'
                        size='full'
                        disabled={isPending}
                    >
                        Change Password
                    </Button>
                    ;
                </form>
            </Form>
        </div>
    );
};

export default EmailPassword;
