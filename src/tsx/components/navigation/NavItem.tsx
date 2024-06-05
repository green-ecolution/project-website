import Arrow from "../../icons/Arrow";

interface NavItemProps {
    label: string;
    url: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, url }) => {
    return (
        <a href={url} className="text-lg font-bold flex justify-between items-center group">
            <p className="transition-color ease-in-out duration-300 group-hover:text-green-light-900">
                {label}
            </p>
            <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2 group-hover:text-green-light-900"/>
        </a>
    );
}

export default NavItem;
