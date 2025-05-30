import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string; // Made explicitly required
  // type, value, onChange etc. are part of InputHTMLAttributes or handled by react-hook-form register
  className?: string;
}

const InputField: React.FC<InputFieldProps> = React.forwardRef<HTMLInputElement, InputFieldProps>(({ id, type = 'text', placeholder, className, ...props }, ref) => {
  return (
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      className={cn(
        'w-full text-card-foreground placeholder:text-muted-foreground',
        // Shadcn Input already uses themed border, background, focus ring colors.
        // Explicitly setting rounded-lg if desired, otherwise it uses Shadcn's default (usually rounded-md).
        // For this project, the card and button are rounded-lg. Inputs in image look similarly rounded.
        'rounded-lg',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

InputField.displayName = 'InputField';

export default InputField;
