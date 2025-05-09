import React from 'react'

interface StepCircleProps {
  index: number
  activeStep: number
  detailedShow?: boolean
}

const StepCircle: React.FC<StepCircleProps> = ({ index, activeStep, detailedShow = false }) => {
  return (
    <figure
      className={`mx-auto flex items-center justify-between rounded-full w-8 h-8
            ${detailedShow ? 'lg:absolute lg:top-1/2 lg:-translate-y-1/2' : ''}
            ${index === activeStep ? 'text-white bg-green-dark-900' : 'text-white bg-green-light-900'}
            ${index < activeStep ? 'border-2 border-green-dark-900 bg-white' : ''}
            ${index % 2 === 0 ? 'lg:-right-14' : 'lg:-left-14'}`}
    >
      <span className="block font-semibold font-lato mx-auto">
        {index < activeStep ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="#4C7741"
            className="w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        ) : (
          index + 1
        )}
      </span>
    </figure>
  )
}

export default StepCircle
