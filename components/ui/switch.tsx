
import React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string; // Optional className
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={cn(
          "bg-[#D7E1F4] peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
