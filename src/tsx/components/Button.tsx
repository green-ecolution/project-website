import React, { ReactNode } from 'react';

interface ButtonProps {
  href: string;
  children: ReactNode;
  ariaLabel: string;
  isExternalLink?: boolean;
  isDark?: boolean;
}

const Button: React.FC<ButtonProps> = ({ href, children, ariaLabel, isExternalLink = false, isDark = false, }) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={isExternalLink ? '_blank' : '_self'}
      className={`flex items-center justify-center gap-x-4 rounded-2xl w-max font-semibold px-5 py-2 group transition-color ease-in-out duration-300 text-white hover:bg-green-light-900 hover:border-green-light-900
        ${isDark ? 'bg-green-dark-900' : 'bg-transparent border border-white'}`}
    >
      {children}
    </a>
  );
};

export default Button;
