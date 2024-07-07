"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/schemas";
import { handleRegister } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { useVerifyCode } from "@/stores/use-verify-models";
import { signIn } from "next-auth/react";
export const SignupForm = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { open } = useVerifyCode((store) => store);
    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isSendMail: false,
        },
    });

    const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
        startTransition(async () => {
            try {
                const response = await handleRegister(data);
                toast.success(response.payload.token, {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
                open();
            } catch (error) {
                toast.error("This Email is already registered!", {
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
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-5 mt-2'
                >
                    <div className='space-y-3'>
                        <FormField
                            control={form.control}
                            name='firstName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='First Name'
                                            className='bg-transparent hover:ring-1 hover:ring-black'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name='lastName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='Last Name'
                                            className='bg-transparent hover:ring-1 hover:ring-black'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='email'
                                            placeholder='Email'
                                            className='bg-transparent hover:ring-1 hover:ring-black'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='Password'
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
                                            placeholder='Re-enter Password'
                                            type='password'
                                            className='bg-transparent hover:ring-1 hover:ring-black'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <div className='flex gap-1'>
                            <FormField
                                control={form.control}
                                name='isSendMail'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            {/* @ts-ignore */}
                                            <Input
                                                {...field}
                                                type='checkbox'
                                                className='bg-transparent h-fit mt-[5.5px]'
                                                id='isRemember'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <label
                                htmlFor='isRemember'
                                className='text-sm ml-1 cursor-pointer'
                            >
                                Send me email notifications for new program
                                launches, website or store updates (optional)
                            </label>
                        </div>
                    </div>
                    <Button
                        type='submit'
                        variant='primary'
                        size='full'
                        disabled={isPending}
                    >
                        Create Account
                    </Button>
                    <div className=''>
                        <div className='flex items-center justify-center space-x-1'>
                            <div className='h-[1px] w-full bg-[#e0e0e0]'></div>
                            <span className='text-sm'>or</span>
                            <div className='h-[1px] w-full bg-[#e0e0e0]'></div>
                        </div>
                    </div>
                    <Button
                        variant='primaryOutline'
                        size='full'
                        className='text-sm font-medium'
                        disabled={isPending}
                        type='button'
                        onClick={() => signIn("google")}
                    >
                        <Image
                            src='/google-c.svg'
                            alt='Google'
                            width={24}
                            height={24}
                            className='mr-2'
                        />
                        Sign up with Google
                    </Button>
                </form>
            </Form>
        </>
    );
};
