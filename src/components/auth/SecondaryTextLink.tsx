import React from 'react';
import { cn } from '@/lib/utils';

interface SecondaryTextLinkProps {
  textBeforeLink?: string;
  linkText: string;
  onLinkClick: () => void;
  className?: string;
}

const SecondaryTextLink: React.FC<SecondaryTextLinkProps> = ({
  textBeforeLink,
  linkText,
  onLinkClick,
  className,
}) => {
  return (
    <p className={cn('text-sm text-secondary-foreground', className)}>
      {textBeforeLink && <span className="mr-1">{textBeforeLink}</span>}
      <button
        type="button"
        onClick={onLinkClick}
        className={cn(
          'font-medium hover:underline focus:outline-none focus:underline',
          // Link color could be primary, but image implies it's same as surrounding text.
          // 'text-primary hover:text-primary/90' // Alternative if teal link is desired
        )}
      >
        {linkText}
      </button>
    </p>
  );
};

export default SecondaryTextLink;
