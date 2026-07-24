import { forwardRef, type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon: Icon, className, ...props }, ref) => {
    return (
      <div className="relative">
        <Icon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input ref={ref} className={cn("pl-8", className)} {...props} />
      </div>
    );
  },
);

InputWithIcon.displayName = "InputWithIcon";
