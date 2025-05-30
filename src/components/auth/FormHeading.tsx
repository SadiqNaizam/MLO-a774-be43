import React from 'react';
import { cn } from '@/lib/utils';

interface FormHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const FormHeading: React.FC<FormHeadingProps> = ({ text, className, as: Component = 'h2' }) => {
  return (
    <Component className={cn('text-3xl font-bold text-card-foreground', className)}>
      {text}
    </Component>
  );
};

export default FormHeading;
