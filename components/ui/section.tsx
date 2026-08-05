import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionVariants = cva("", {
  variants: {
    density: {
      /** Homepage narrative sections. */
      marketing: "py-20 sm:py-28",
      /** Interior/utility routes and PageHeader. */
      utility: "py-16 sm:py-20",
    },
  },
  defaultVariants: {
    density: "marketing",
  },
})

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, density, ...props }, ref) => (
    <section ref={ref} className={cn(sectionVariants({ density }), className)} {...props} />
  )
)
Section.displayName = "Section"

export { sectionVariants }
