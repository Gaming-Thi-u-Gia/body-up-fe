import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full",
    {
        variants: {
            variant: {
                default: "hover:bg-black hover:text-white",
                defaultOutline: "text-black hover:border hover:border-black",
                primary:
                    "bg-black text-white hover:bg-white hover:text-[#303033] ring-[1px] ring-black",
                primaryOutline: "text-black border border-black",
                secondary: "bg-[#eaedef] text-[#303033] hover:bg-[#e2e7e9]",
                active: "bg-black text-white",
                disabled: "bg-gray-300 text-gray-500 cursor-auto",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 px-5",
                lg: "h-10 px-7",
                icon: "h-8 w-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
