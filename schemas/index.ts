import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Please enter valid email address!" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long!" }),
    isRemember: z.boolean(),
});

export const SignUpSchema = z
    .object({
        firstName: z.string({
            message: "Please enter your first name!",
        }),
        lastName: z.string({
            message: "Please enter your last name!",
        }),
        email: z
            .string()
            .email({ message: "Please enter valid email address!" }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long!",
        }),
        confirmPassword: z.string().min(6),

        isSendMail: z.boolean(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });
export const OtpSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});
export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter valid email address!" }),
});

export const ChangePasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long!",
        }),
        confirmPassword: z.string().min(6),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });

export const PostSchema = z.object({
    title: z.string().min(3, {
        message: "Please enter a title for your post!",
    }),
    description: z.string().min(3, {
        message: "Please enter details for your post!",
    }),
    badge: z.string().min(1, {
        message: "Please select a tag for your post!",
    }),
});

export const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    bio: z.string(),
    username: z.string().optional(),
    profileTitle: z.string().optional(),
});

export const BeforeAfterPostSchema = z.object({
    title: z.string().min(3, {
        message: "Please enter a title for your post!",
    }),
    beforeImage: z.instanceof(File).nullable(),
    afterImage: z.instanceof(File).nullable(),
    dayBeforeTaken: z.date().min(new Date(2003, 1, 1), {
        message: "Please enter a valid date for the before image!",
    }),
    dayAfterTaken: z.date().min(new Date(2003, 1, 1), {
        message: "Please enter a valid date for the after image!",
    }),
    moreImage: z.array(z.string()).optional(),
    description: z.string().min(3, {
        message: "Please enter a description for your post!",
    }),
    tagSelect: z.string().min(1, {
        message: "Please select a tag for your post!",
    }),
    programSelect: z.string().min(1, {
        message: "Please select a tag for your post!",
    }),
});
