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
      className={`cursor-pointer border border-green-dark-900 bg-white rounded-2xl shadow-md ${open ? 'border-green-light-900' : 'border-green-dark-900'}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className={`w-full px-4 py-3 rounded-t-2xl cursor-pointer flex items-center justify-between gap-x-4 font-semibold font-lato transition-color ease-in-out duration-300 md:px-6 md:py-4 hover:bg-green-dark-900/10 ${open ? 'bg-green-light-900/10' : 'rounded-b-2xl'}`}
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
          className={`w-7 h-7 rounded-full text-white flex items-center justify-center transition-all ease-in-out duration-300 ${open ? 'bg-green-light-900 rotate-180' : 'bg-green-dark-900'}`}
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
        className={`max-h-0 text-base leading-relaxed overflow-hidden px-4 transition-all ease-in-out duration-300 border-t md:px-6 ${open ? 'border-t-green-light-900 pt-3 py-4 md:pb-6' : 'border-t-transparent'}`}
      >
        {children}
      </div>
    </li>
  )
}

export default Accordion
