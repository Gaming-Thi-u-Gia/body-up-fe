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
import { ForgotPasswordSchema } from "@/schemas";
import { handleSendResetCode } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useVerifyResetCode } from "@/stores/use-change-password-models";

export const ForgotPasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const { open } = useVerifyResetCode((store) => store);
    const form = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
        startTransition(async () => {
            try {
                const res = await handleSendResetCode(data);
                toast.success(res.payload.token, {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
                open();
            } catch (error) {
                toast.error("This Email is not existed!", {
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
                    className="space-y-5 mt-2"
                >
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="E-mail"
                                            className="bg-transparent hover:ring-1 hover:ring-black"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="full"
                        disabled={isPending}
                    >
                        Send Verify Code
                    </Button>
                    ;
                </form>
            </Form>
        </>
    );
};
