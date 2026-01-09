import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_16px_rgba(0,169,146,0.25)] dark:hover:bg-primary/80 dark:hover:shadow-[0_8px_20px_rgba(0,169,146,0.4)]',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 hover:shadow-[0_8px_16px_rgba(187,6,30,0.25)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/80 dark:hover:bg-destructive/70 dark:hover:shadow-[0_8px_16px_rgba(187,6,30,0.3)]',
        outline:
          'border border-border bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-[0_4px_12px_rgba(0,169,146,0.15)] dark:bg-card dark:border-border dark:hover:bg-input/40 dark:hover:text-foreground dark:hover:shadow-[0_4px_12px_rgba(0,169,146,0.2)] shadow-xs',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:bg-secondary/20 dark:text-foreground dark:hover:bg-secondary/30 dark:hover:shadow-[0_4px_12px_rgba(0,169,146,0.15)]',
        ghost:
          'hover:bg-accent hover:text-accent-foreground hover:shadow-[0_2px_8px_rgba(0,169,146,0.1)] dark:hover:bg-accent/40 dark:text-foreground dark:hover:shadow-[0_2px_8px_rgba(0,169,146,0.15)]',
        link: 'text-primary underline-offset-4 hover:underline dark:text-primary',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
