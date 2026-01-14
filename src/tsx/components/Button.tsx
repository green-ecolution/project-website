import React, { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

interface ButtonProps {
  href: string
  children: ReactNode
  ariaLabel: string
  isExternalLink?: boolean
  isDark?: boolean
}

const Button: React.FC<ButtonProps> = ({
  href,
  children,
  ariaLabel,
  isExternalLink = false,
  isDark = false,
}) => {
  const baseClasses =
    'flex items-center justify-center gap-x-4 rounded-2xl w-max font-semibold px-5 py-2 group transition-all ease-in-out duration-300 text-white'

  const darkClasses =
    'bg-green-dark-900 hover:bg-green-light-900 hover:shadow-lg hover:shadow-green-light-900/40 hover:-translate-y-0.5'

  const lightClasses =
    'bg-transparent border border-white hover:bg-green-light-900 hover:border-green-light-900 hover:shadow-lg hover:shadow-green-light-900/30'

  const className = `${baseClasses} ${isDark ? darkClasses : lightClasses}`

  if (isExternalLink) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={href} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  )
}

export default Button
