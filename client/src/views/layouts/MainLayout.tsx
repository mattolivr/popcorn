import { Avatar, type CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { useState } from "react";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import {
  FaBars,
  FaBell,
  FaEnvelope,
  FaFilm,
  FaGlobe,
  FaHouse,
  FaMagnifyingGlass,
  FaTv,
  FaUser,
  FaUserGroup,
} from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import Button, { type ButtonProps } from "../../components/Button";
// import Input from "../../components/Input";
import Menu from "../../components/ui/Menu";

export function MainLayout(): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="min-h-dvh w-full bg-gray-200">
      <header className="sticky top-0 z-50 flex w-full flex-row items-center bg-sky-500 px-4 py-2">
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
      <Menu
        visibility={{ visible: menuVisible, setVisibility: setMenuVisible }}
      />
      <div className="relative flex h-max w-full justify-center">
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
            <Button {...btn} className="px-3 py-2" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SearchBar({ className }: { className?: string }): JSX.Element {
  // return <Input ricon={FaMagnifyingGlass} className={className} />;
}

interface NavProps {
  toggleMenu: () => void;
}

function Nav({ toggleMenu }: NavProps): JSX.Element {
  return (
    <nav className="flex w-full flex-row items-center justify-end gap-0 sm:gap-3">
      <ul className="text-md hidden flex-row items-center font-semibold text-white xl:flex">
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
      {/* <Link to={link.path} className="w-full outline-none focus:text-sky-300">
        {link.label}
      </Link> */}
      <Button to={link.path} className="px-3 py-2">
        {link.label}
      </Button>
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
  inlineWrapper:
    "flex items-center text-white font-semibold hover:bg-sky-600 py-2 px-3 rounded-xl",
};

function BottomNav(): JSX.Element {
  return (
    <div className="fixed bottom-0 z-50 w-full">
      <div className="flex h-12 w-full flex-row items-center bg-sky-500 px-2 md:hidden">
        <Button icon={FaHouse} to="/" className="w-full" />
        <Button icon={FaEnvelope} to="/messages" className="w-full" />
        <Button icon={FaPlus} className="w-full" />
        <Button icon={FaBell} to="/notifications" className="w-full" />
        <Button to="/users" className="w-full">
          <Avatar size="xs" rounded />
        </Button>
      </div>
    </div>
  );
}
