import React from 'react'

interface IntroductionCardProps {
  label: string
  icon: string
  description: string
}

const IntroductionCard: React.FC<IntroductionCardProps> = ({ label, icon, description }) => {
  return (
    <div
      className="
        group h-full bg-white
        shadow-md hover:shadow-lg
        rounded-2xl p-6
        border border-grey-100 hover:border-green-light-900/30
        transition-all duration-300
        cursor-default
        hover:-translate-y-0.5
      "
    >
      <figure
        className="
          bg-green-light-900/20 w-12 h-12 rounded-xl
          flex items-center justify-center
          transition-all duration-300
          group-hover:bg-green-light-900/30 group-hover:scale-105
        "
      >
        <img src={icon} className="object-contain w-6 h-6" alt={label} />
      </figure>
      <h3 className="my-4 font-lato font-bold text-lg text-grey-900 md:my-5">{label}</h3>
      <p className="text-grey-900/80 leading-relaxed">{description}</p>
    </div>
  )
}

export default IntroductionCard
