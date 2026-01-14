import React, { ReactNode, useState, useRef, useEffect, useId } from 'react'

interface AccordionProps {
  label: string
  children: ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ label, children }) => {
  const [open, setOpen] = useState(false)
  const [maxHeight, setMaxHeight] = useState('auto')
  const accordionPanel = useRef<HTMLDivElement>(null)
  const id = useId()
  const panelId = `accordion-panel-${id}`

  const toggleAccordion = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (!accordionPanel.current) return
    setMaxHeight(`${accordionPanel.current.scrollHeight + 40}px`)

    if (!open) {
      setTimeout(() => setMaxHeight('0px'), 0)
    }
  }, [open])

  return (
    <li
      className={`
        cursor-pointer border bg-white rounded-2xl
        transition-all duration-300
        ${open ? 'border-green-light-900 shadow-lg shadow-green-light-900/20' : 'border-green-dark-900/30 shadow-md hover:shadow-lg hover:border-green-dark-900/50'}
      `}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className={`
          w-full px-4 py-4 cursor-pointer flex items-center justify-between gap-x-4
          font-semibold font-lato text-grey-900 transition-all ease-in-out duration-300
          md:px-6 md:py-5
          ${open ? 'bg-green-light-900/10 rounded-t-2xl' : 'rounded-2xl hover:bg-green-dark-900/5'}
        `}
        onClick={toggleAccordion}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleAccordion()
          }
        }}
      >
        <span className="w-[85%] text-left lg:text-lg">{label}</span>
        <span
          aria-hidden="true"
          className={`
            w-8 h-8 rounded-full text-white flex items-center justify-center
            transition-all ease-in-out duration-300
            ${open ? 'bg-green-light-900 rotate-180 shadow-md shadow-green-light-900/30' : 'bg-green-dark-900'}
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div
        id={panelId}
        ref={accordionPanel}
        role="region"
        inert={!open ? true : undefined}
        style={{ maxHeight }}
        className={`
          max-h-0 text-base text-grey-900/80 leading-relaxed overflow-hidden px-4
          transition-all ease-in-out duration-300 border-t md:px-6
          ${open ? 'border-t-green-light-900/30 pt-3 py-4 md:pb-6' : 'border-t-transparent'}
        `}
      >
        {children}
      </div>
    </li>
  )
}

export default Accordion
