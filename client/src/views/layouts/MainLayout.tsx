import { useState } from "react";
import { type IconBaseProps, type IconType } from "react-icons";
import { FaBell, FaGlobe, FaPlus, FaSearch } from "react-icons/fa";
import { FaHouse, FaMessage } from "react-icons/fa6";
import { Link, Outlet, useLocation } from "react-router-dom";
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
        <SearchBar className="hidden w-8/12 xl:inline" />
        <Nav />
      </header>
      <div className="flex h-full w-full justify-center bg-gray-200 relative">
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
  return (
    <div className="flex w-full flex-row items-center gap-4">
      <button
        className="h-10 w-10 rounded-full bg-orange-300"
        onClick={toggleMenu}
      />
      <ul className="hidden flex-row items-center gap-4 text-2xl text-gray-100 sm:flex">
        <li>
          <Link className="outline-none focus:text-sky-300" to="/">
            <FaHouse />
          </Link>
        </li>
        <li>
          <Link className="outline-none focus:text-sky-300" to="/notifications">
            <FaBell />
          </Link>
        </li>
        <li>
          <Link className="outline-none focus:text-sky-300" to="/messages">
            <FaMessage />
          </Link>
        </li>
        <li>
          <button
            className="outline-none focus:text-sky-300"
            onClick={() => {
              alert("TODO: Modal");
            }}
          >
            <FaPlus />
          </button>
        </li>
      </ul>
    </div>
  );
}

function SearchBar({ className }: { className?: string }): JSX.Element {
  return (
    <div className={`relative h-9 ${className}`}>
      <button className="hidden h-full w-full cursor-text rounded-lg bg-gray-100 sm:inline-block"></button>
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center rounded-xl pe-2 sm:pe-3 sm:pl-3">
        <FaSearch className="text-2xl text-white sm:text-base sm:text-gray-600" />
      </div>
    </div>
  );
}

function Nav(): JSX.Element {
  return (
    <>
      <nav className="flex w-full flex-row items-center justify-end gap-2">
        <ul className="text-md hidden flex-row items-center gap-3 font-semibold text-white xl:flex">
          <NavLinks />
        </ul>
        <NavDropdown />
        <SearchBar className="inline w-10 sm:w-72 xl:hidden" />
      </nav>
    </>
  );
}

function NavLinks({ linkStyle }: { linkStyle?: string }): JSX.Element {
  const links = [
    {
      path: "/movies",
      label: "Filmes",
    },
    {
      path: "/shows",
      label: "Séries",
    },
    {
      path: "/people",
      label: "Elenco",
    },
    {
      path: "/clubs",
      label: "Clubes",
    },
    {
      path: "/users",
      label: "Perfis",
    },
    {
      path: "/discover",
      label: "Explorar",
    },
    {
      path: "/about",
      label: "Sobre",
    },
  ];

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
    <div className="hs-dropdown relative inline-flex [--trigger:hover] xl:hidden">
      <button
        id="hs-dropdown-hover-event"
        type="button"
        className="hs-dropdown-toggle text-md inline-flex items-center gap-x-2
            bg-transparent font-medium text-white"
      >
        <div className="hidden items-center gap-1 sm:inline-flex">
          <span>Descobrir</span>
          <svg
            className="h-4 w-4 hs-dropdown-open:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <FaGlobe className="text-2xl sm:hidden" />
      </button>

      <div
        className="hs-dropdown-menu duration z-10 mt-2 hidden min-w-[10rem] rounded-lg bg-white p-2 opacity-0 
        shadow-md transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-4 before:w-full 
        after:absolute after:-bottom-4 after:start-0 after:h-4 after:w-full hs-dropdown-open:opacity-100"
        aria-labelledby="hs-dropdown-hover-event"
      >
        <ul className="flex flex-col">
          <NavLinks
            linkStyle="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 
            focus:outline-none focus:bg-gray-100 font-regular"
          />
        </ul>
      </div>
    </div>
  );
}

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
