import React, { ReactNode } from 'react';

interface ButtonProps {
  href: string;
  children: ReactNode;
  ariaLabel: string;
  isExternalLink?: boolean;
}

const Button: React.FC<ButtonProps> = ({ href, children, ariaLabel, isExternalLink = false }) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={isExternalLink ? '_blank' : '_self'}
      className="flex items-center justify-center gap-x-4 rounded-2xl w-max font-semibold px-5 py-2 bg-transparent border border-white text-white group transition-color ease-in-out duration-300 hover:bg-green-light-900 hover:border-green-light-900"
    >
      {children}
    </a>
  );
};

export default Button;
