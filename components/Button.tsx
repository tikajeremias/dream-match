import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link";

const buttonVariants = cva(
  "px-4 text-center py-2",
  {
    variants: {
      variant: {
        default:
          "w-[100%] lg:w-auto text-base font-medium rounded-md bg-gradient-to-r from-gradient-a to-gradient-b text-[#2D2D2D] hover:bg-sky-700",
        secondary:
          "p-0 text-base font-medium rounded-md text-neutral-50 text-neutral-800",
        destructive:
          "p-0 text-base font-medium rounded-md text-neutral-50 text-neutral-800",
        disabled:
          "w-[100%] lg:w-auto text-base text-neutral-400 font-medium rounded-md bg-neutral-600",
        ready:
          "w-[100%] lg:w-auto text-base text-white font-medium rounded-md bg-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ButtonProps
  extends LinkProps,
  VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  className?: string;
  label?: string;
  href: string;
}

function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <Link className={cn(buttonVariants({ variant }), className)} {...props}>{props.label}{props.icon}</Link>
  )
}

export { Button, buttonVariants }
