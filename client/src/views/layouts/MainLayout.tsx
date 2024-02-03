import { useState } from "react";
import { FaBell, FaGlobe, FaPlus, FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Menu from "../../components/ui/Menu";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [menuVisible, setMenuVisible] = useState(true);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex w-full flex-row items-center bg-sky-500 px-4 py-2">
        <Controlls
          toggleMenu={() => {
            setMenuVisible(!menuVisible);
          }}
        />
        <SearchBar className="hidden w-8/12 xl:inline" />
        <Nav />
      </header>
      <main className="relative grow">
        <Menu visible={menuVisible} />
        <div className="flex min-h-full w-full justify-center bg-slate-100">
          {children}
        </div>
      </main>
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
      <ul className="flex flex-row items-center gap-4 text-2xl text-gray-100">
        <li>
          <FaBell />
        </li>
        <li>
          <FaMessage />
        </li>
        <li>
          <FaPlus />
        </li>
      </ul>
    </div>
  );
}

function SearchBar({ className }: { className?: string }): JSX.Element {
  return (
    <div className={`relative h-9 ${className}`}>
      <button className="hidden h-full w-full cursor-text rounded-lg bg-gray-100 sm:inline-block"></button>
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center rounded-xl pe-3 pl-3">
        <FaSearch className="text-2xl text-white sm:text-base sm:text-gray-600" />
      </div>
    </div>
  );
}

function Nav(): JSX.Element {
  return (
    <>
      <nav className="flex w-full flex-row items-center justify-end gap-2">
        <ul className="text-md hidden flex-row-reverse items-center gap-4 font-semibold text-white xl:flex">
          <NavLinks />
        </ul>

        <NavDropdown />

        <SearchBar className="inline w-10 sm:w-72 xl:hidden" />

        <img
          src="./src/assets/popcorn-logo.png"
          className="h-10 w-10 shadow-lg"
        />
      </nav>
    </>
  );
}

function NavLinks({ linkStyle }: { linkStyle?: string }): JSX.Element {
  return (
    <>
      <li className={linkStyle}>
        <Link to={"/about"}>Sobre</Link>
      </li>
      <li className={linkStyle}>
        <Link to={"/discover"}>Mais</Link>
      </li>
      <li className={linkStyle}>
        <Link to={"/users"}>Perfis</Link>
      </li>
      <li className={linkStyle}>
        <Link to={"/clubs"}>Clubes</Link>
      </li>
      <li className={linkStyle}>
        <Link to={"/people"}>Pessoas</Link>
      </li>
      <li className={linkStyle}>
        <Link to={"/shows"}>Séries</Link>
      </li>
      <li className={linkStyle}>
        <Link to={"/movies"}>Filmes</Link>
      </li>
    </>
  );
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
        className="hs-dropdown-menu duration mt-2 hidden min-w-[10rem] rounded-lg bg-white p-2 opacity-0 shadow-md 
        transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-4 before:w-full after:absolute 
        after:-bottom-4 after:start-0 after:h-4 after:w-full hs-dropdown-open:opacity-100"
        aria-labelledby="hs-dropdown-hover-event"
      >
        <ul className="flex flex-col-reverse">
          <NavLinks
            linkStyle="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 
            focus:outline-none focus:bg-gray-100 font-regular"
          />
        </ul>
      </div>
    </div>
  );
}
