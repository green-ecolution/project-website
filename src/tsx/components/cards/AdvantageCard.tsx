interface AdvantageCardProps {
  label: string
  description: string
  icon: string
  accentColor: 'dark' | 'middle'
}

const accentStyles = {
  dark: 'bg-green-dark-900',
  middle: 'bg-green-middle-900',
}

function AdvantageCard({ label, description, icon, accentColor }: AdvantageCardProps) {
  return (
    <div
      className="group h-full bg-green-light-100 rounded-2xl p-6 lg:p-8
        shadow-xs hover:shadow-sm border border-green-dark-900/20
        transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon container with colored background */}
        <div
          className={`w-14 h-14 lg:w-16 lg:h-16 rounded-xl ${accentStyles[accentColor]}
            flex items-center justify-center mb-4
            group-hover:scale-105 transition-transform duration-300`}
        >
          <img
            src={icon}
            className="w-7 h-7 lg:w-8 lg:h-8 object-contain brightness-0 invert"
            alt=""
          />
        </div>

        {/* Content */}
        <h3 className="font-lato font-bold text-lg lg:text-xl text-grey-900 mb-2">{label}</h3>
        <p className="text-grey-600 text-sm lg:text-base leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default AdvantageCard
