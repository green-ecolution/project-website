import React, { ReactNode } from 'react'
import Arrow from '../../icons/Arrow'

interface StakeholderCardProps {
  label: string
  url: string
  image: string
  children: ReactNode
  hasDesktopList?: boolean
}

const StakeholderCard: React.FC<StakeholderCardProps> = ({
  label,
  url,
  image,
  children,
  hasDesktopList = false,
}) => {
  return (
    <figure
      className={`h-full cursor-pointer bg-white shadow-md rounded-2xl p-6 border border-grey-100 md:p-8 md:grid md:grid-cols-[15rem_auto] md:gap-x-12 md:items-center
            ${hasDesktopList ? 'lg:cursor-default' : ''}`}
    >
      <img
        src={image}
        className="object-contain max-w-64 h-32 mx-auto md:max-w-52"
        alt={`Logo ${label}`}
        loading="lazy"
      />

      <figcaption className="mt-10 md:mt-0">
        <h3 className="font-lato font-semibold text-lg">{label}</h3>

        {children}

        <a
          href={url}
          target="_blank"
          className="text-green-dark-900 font-bold flex itemx-center gap-x-4 group"
        >
          <p className="transition-all ease-in-out duration-300 group-hover:text-green-light-900">
            Zur Webseite
          </p>
          <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2 group-hover:text-green-light-900" />
        </a>
      </figcaption>
    </figure>
  )
}

export default StakeholderCard
