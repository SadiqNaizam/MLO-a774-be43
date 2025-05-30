import React from 'react';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';

// Omit 'variant' to ensure this button always uses the primary styling (Shadcn's 'default' variant).
interface PrimaryButtonProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      variant="default" // Uses `bg-primary` and `text-primary-foreground` from theme
      className={cn(
        'w-full font-bold rounded-lg', // Per requirements: full width, bold font, rounded-lg corners
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
