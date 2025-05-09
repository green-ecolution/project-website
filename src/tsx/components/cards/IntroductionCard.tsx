import React from 'react'

interface IntroductionCardProps {
  label: string
  icon: string
  description: string
}

const IntroductionCard: React.FC<IntroductionCardProps> = ({ label, icon, description }) => {
  return (
    <div className="h-full cursor-pointer bg-white shadow-md rounded-2xl p-6 border border-grey-100 xl:cursor-default">
      <figure className="bg-green-light-900/25 w-12 h-12 rounded-full flex items-center justify-center">
        <img src={icon} className="object-contain w-6 h-6 " alt={label} />
      </figure>
      <h3 className="my-4 font-lato font-semibold text-lg md:my-5">{label}</h3>
      <p>{description}</p>
    </div>
  )
}

export default IntroductionCard
