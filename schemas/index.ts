import { number, z } from "zod";

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

    badge: z.object({
        id: z.number(),
        name: z.string(),
    }),
});
export const CommentSchema = z.object({
    detail: z.string().min(3, {
        message: "Please enter a comment!",
    }),
    parentId: z.number().nullable(),

    // user: z.object({
    //     id: z.number(),
    //     firstName: z.string(),
    //     lastName: z.string(),
    //     username: z.string(),
    //     email: z.string(),
    //     avatar: z.string(),
    //     profile_picture: z.string(),
    // }),
    // post: z.object({
    //     id: z.number(),
    //     title: z.string(),
    //     description: z.string(),
    //     badge: z.object({
    //         id: z.number(),
    //         name: z.string(),
    //     }),
    //     categoryCommunity: z.object({
    //         categoryId: z.number(),
    //         name: z.string(),
    //     }),
    //     created_at: z.date(),
    // }),
    // upVote: number().optional(),
});

export const formSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    bio: z.string().optional(),
    username: z.string().optional(),
    profileTitle: z.string().optional(),
});
const imageFile = z.instanceof(File).refine(
    (file) => {
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        return validImageTypes.includes(file.type);
    },
    {
        message: "File must be an image",
    }
);
export const UploadPhotoSchema = z.object({
    photoAngle: z.string(),
    visibility: z.boolean(),
    date: z.date(),
    caption: z.string().max(10, { message: "Not" }),
    imgUrl: imageFile.nullable(),
});

export const BeforeAfterPostSchema = z.object({
    title: z.string().min(3, {
        message: "Please enter a title for your post!",
    }),
    description: z.string().min(3, {
        message: "Please enter a description for your post!",
    }),
    imgBefore: z.instanceof(File).nullable(),
    imgAfter: z.instanceof(File).nullable(),
    dayBefore: z.date().min(new Date(2003, 1, 1), {
        message: "Please enter a valid date for the before image!",
    }),
    dayAfter: z.date().min(new Date(2003, 1, 1), {
        message: "Please enter a valid date for the after image!",
    }),
    moreImage: z.array(z.string()).optional(),

    badge: z.object({
        id: z.number(),
        name: z.string(),
    }),
    programSelect: z.string().optional(),
});
