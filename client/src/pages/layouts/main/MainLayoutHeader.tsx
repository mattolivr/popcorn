import { Avatar, CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { FaInfoCircle } from "react-icons/fa";
import { FaBars, FaFilm, FaGlobe, FaMagnifyingGlass, FaPlus, FaTv, FaUser, FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button, { ButtonProps } from "../../../components/button/Button";
import { Input } from "../../../components/input/Input";
import { useMenu } from "../../../components/menu/context";

export default function MainLayoutHeader(): ReactNode {
  return (
    <header className="sticky top-0 z-50 flex w-full flex-row items-center bg-sky-500 px-4 py-2">
      <MainLayoutHeaderButtons />
      <MainLayoutHeaderSearchBar className="hidden w-7/12 xl:flex" />
      <MainLayoutHeaderNavigation />
    </header>
  );
}

function MainLayoutHeaderButtons(): ReactNode {
  const menu = useMenu();

  const headerButtons: ButtonProps[] = [
    {
      icon: FaBars,
      onClick: () => {
        menu.setCollapsed(!menu.collapsed);
      },
      className: "hidden xl:block",
    },
    {
      icon: FaBars,
      onClick: () => {
        menu.setVisible(!menu.visible);
      },
      className: "hidden sm:block md:hidden",
    },
    {
      icon: FaPlus,
    },
  ];

  return (
    <div className="flex w-full flex-row items-center">
      <Link to={"/"}>
        <img src="/popcorn-logo.png" className="block h-10 w-10 cursor-pointer resize-none" />
      </Link>
      <div className="ml-2 flex items-center">
        {headerButtons.map((btn, index) => (
          <Button key={index} {...btn} />
        ))}
      </div>
    </div>
  );
}

function MainLayoutHeaderSearchBar({ className }: { className?: string }): ReactNode {
  return <Input className={className} ricon={FaMagnifyingGlass} />;
}

const headerLinks: Array<{ path: string; label: string; icon: IconType }> = [
  {
    path: "/movies",
    label: "Filmes",
    icon: FaFilm,
  },
  {
    path: "/shows",
    label: "Séries",
    icon: FaTv,
  },
  {
    path: "/people",
    label: "Elenco",
    icon: FaUser,
  },
  {
    path: "/clubs",
    label: "Clubes",
    icon: FaUserGroup,
  },
  {
    path: "/discover",
    label: "Explorar",
    icon: FaGlobe,
  },
  {
    path: "/about",
    label: "Sobre",
    icon: FaInfoCircle,
  },
];

function MainLayoutHeaderNavigation(): ReactNode {
  const menu = useMenu();

  const navigationButtons: ButtonProps[] = [
    {
      icon: FaGlobe,
      className: "flex sm:hidden",
      to: "/discover",
    },
    {
      icon: FaMagnifyingGlass,
      className: "flex sm:hidden",
      to: "/search",
    },
    {
      icon: FaBars,
      className: "flex sm:hidden",
      onClick: () => {
        menu.setVisible(!menu.visible);
      },
    },
  ];

  return (
    <nav className="flex w-full flex-row items-center justify-end gap-0 sm:gap-3">
      <ul className="text-md hidden flex-row items-center font-semibold text-white xl:flex">
        {headerLinks.map((link) => (
          <li key={link.path}>
            <Button to={link.path} className="px-2 py-1">
              {link.label}
            </Button>
          </li>
        ))}
      </ul>
      <MainLayoutHeaderNavigationDropdown />

      {navigationButtons.map((btn, index) => (
        <Button key={index} {...btn} />
      ))}

      <MainLayoutHeaderSearchBar className="hidden w-[250px] sm:flex xl:hidden" />
      <Avatar rounded className="hidden sm:block" />
    </nav>
  );
}

function MainLayoutHeaderNavigationDropdown(): ReactNode {
  return (
    <div className="hidden sm:inline xl:hidden">
      <Dropdown label="Descobrir" theme={navigationDropdownTheme} inline>
        {headerLinks.map((link) => (
          <Dropdown.Item key={link.path} icon={link.icon}>
            <Link to={link.path} className="font-semibold">
              {link.label}
            </Link>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
}

const navigationDropdownTheme: CustomFlowbiteTheme["dropdown"] = {
  inlineWrapper: "flex items-center text-white font-semibold hover:bg-sky-600 py-2 px-3 rounded-xl",
};
