import { Avatar, type CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { useState } from "react";
import { type IconBaseProps, type IconType } from "react-icons";
import { FaBell, FaInfoCircle, FaPlus, FaSearch } from "react-icons/fa";
import {
  FaBars,
  FaFilm,
  FaGlobe,
  FaHouse,
  FaMagnifyingGlass,
  FaMessage,
  FaTv,
  FaUser,
  FaUserGroup,
} from "react-icons/fa6";
import { Link, Outlet, useLocation } from "react-router-dom";
import Button, { type ButtonProps } from "../../components/Button";
import Input from "../../components/Input";
import Menu from "../../components/ui/Menu";

export function MainLayout(): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="flex h-svh flex-col">
      {/* //TODO Deixar header fixado no topo da tela */}
      <header className="flex w-full flex-row items-center bg-sky-500 px-4 py-2">
        <Controlls
          toggleMenu={() => {
            setMenuVisible(!menuVisible);
          }}
        />
        <SearchBar className="hidden w-8/12 xl:flex" />
        <Nav
          toggleMenu={() => {
            setMenuVisible(!menuVisible);
          }}
        />
      </header>
      <div className="relative flex h-full w-full justify-center bg-gray-200">
        <Menu
          visibility={{ visible: menuVisible, setVisibility: setMenuVisible }}
        />
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

interface ControllsProps {
  toggleMenu: () => void;
}

function Controlls({ toggleMenu }: ControllsProps): JSX.Element {
  const controllButtons: ButtonProps[] = [
    { key: "header-btn-1", onClick: toggleMenu, icon: FaBars },
    {
      key: "header-btn-2",
      onClick: () => {
        alert("TODO: Modal");
      },
      icon: FaPlus,
    },
  ];

  return (
    <div className="flex w-full flex-row items-center gap-2">
      <Link to={"/"}>
        <img
          src="/src/assets/popcorn-logo.png"
          className="block h-10 w-10 cursor-pointer resize-none"
        />
      </Link>
      <ul className="hidden flex-row items-center text-2xl text-gray-100 sm:flex">
        {controllButtons.map((btn) => (
          <li key={btn.key}>
            <Button {...btn} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SearchBar({ className }: { className?: string }): JSX.Element {
  return <Input ricon={FaMagnifyingGlass} className={className} />;
}

interface NavProps {
  toggleMenu: () => void;
}

function Nav({ toggleMenu }: NavProps): JSX.Element {
  return (
    <nav className="flex w-full flex-row items-center justify-end gap-0 sm:gap-3">
      <ul className="text-md hidden flex-row items-center gap-3 font-semibold text-white xl:flex">
        <NavLinks />
      </ul>
      <NavDropdown />
      <Button icon={FaGlobe} className="flex sm:hidden" to="/explore" />
      <Button
        icon={FaMagnifyingGlass}
        className="flex sm:hidden"
        onClick={() => {
          alert("SearchBar");
        }}
      />
      <Button icon={FaBars} className="flex sm:hidden" onClick={toggleMenu} />
      <SearchBar className="hidden w-[250px] sm:flex xl:hidden" />
      <Avatar rounded className="hidden sm:block" />
    </nav>
  );
}

const links = [
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

function NavLinks({ linkStyle }: { linkStyle?: string }): JSX.Element {
  const components = links.map((link) => (
    <li key={link.path} className={linkStyle}>
      <Link to={link.path} className="w-full outline-none focus:text-sky-300">
        {link.label}
      </Link>
    </li>
  ));

  return <>{components}</>;
}

function NavDropdown(): JSX.Element {
  return (
    <div className="hidden sm:inline xl:hidden">
      <Dropdown label="Descobrir" theme={navDropdownStyle} inline>
        {links.map((link) => (
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

const navDropdownStyle: CustomFlowbiteTheme["dropdown"] = {
  inlineWrapper: "flex items-center text-white font-semibold",
};

function BottomNav(): JSX.Element {
  return (
    <div className="sticky bottom-0 w-full">
      <div className="flex h-12 w-full flex-row items-center justify-around bg-sky-500 sm:hidden">
        <BottomNavItem icon={FaHouse} label="Página Inicial" path="/" />
        <BottomNavItem icon={FaSearch} label="Explorar" path="/explore" />
        <BottomNavItem icon={FaPlus} label="Adicionar" path="#" />
        <BottomNavItem
          icon={FaBell}
          label="Notificações"
          path="/notifications"
        />
        <BottomNavItem icon={FaMessage} label="Mensagens" path="/messages" />
      </div>
    </div>
  );
}

interface BottomNavItemProps {
  icon: IconType;
  label: string;
  path: string;
}

function BottomNavItem(props: BottomNavItemProps): JSX.Element {
  const currentPath = useLocation();
  const isCurrentPath = (path: string): boolean =>
    currentPath.pathname === path;

  const iconProps: IconBaseProps = {
    className: `text-xl ${isCurrentPath(props.path) ? "text-orange-200" : "text-white"}`,
  };

  return <Link to={props.path}>{props.icon(iconProps)}</Link>;
}
