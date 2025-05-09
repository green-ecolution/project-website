import Arrow from '../../icons/Arrow'

interface NavItemProps {
  label: string
  url: string
  isExternalLink?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ label, url, isExternalLink = false }) => {
  return (
    <li className="mb-4 lg:mb-0">
      <a
        href={url}
        target={isExternalLink ? '_blank' : '_self'}
        className="text-lg md:text-2xl font-bold flex justify-between items-center group lg:text-lg lg:leading-none lg:my-1"
      >
        <p className="transition-color ease-in-out duration-300 group-hover:text-green-light-900 lg:group-hover:text-green-middle-900">
          {label}
        </p>
        <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2 group-hover:text-green-light-900 lg:hidden" />
      </a>
    </li>
  )
}

export default NavItem
