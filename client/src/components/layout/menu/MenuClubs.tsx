import { fakerPT_BR as faker } from "@faker-js/faker";
import { useEffect, useRef, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Divider from "../../core/divider/Divider";
import Anchor from "../../core/link/Link";
import { useMenu } from "./context";
import { MenuButton } from "./MenuButton";

export default function MenuClubs() {
  const menu = useMenu();
  const [visibleClubs, setVisibleClubs] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const totalClubs = 8; // TODO: Pegar do usuário

  useEffect(() => {
    // Função que calcula quantos itens cabem no contêiner
    const calculateVisibleClubs = () => {
      const containerHeight = containerRef.current?.clientHeight;
      const itemHeight = 60; // Altura de cada item + margem
      if (containerHeight) {
        const itemsVisible = Math.floor(containerHeight / itemHeight);
        setVisibleClubs(itemsVisible);
      }
    };

    const resizeObserver = new ResizeObserver(calculateVisibleClubs);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    calculateVisibleClubs();

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="grow overflow-hidden">
      {!menu.collapsed && <Divider>Clubes</Divider>}
      {Array.from({ length: totalClubs })
        .slice(0, visibleClubs) // Renderiza apenas os itens que cabem no contêiner
        .map((_value, index) => (
          <Link key={index} to={"#"} className="flex flex-col items-center rounded-2xl p-2 hover:bg-gray-300">
            <div className="flex w-full items-center justify-start">
              <img src={faker.image.urlPicsumPhotos()} className="h-10 w-10 rounded-lg" />
              <div className="flex max-h-10 flex-col overflow-hidden leading-5">
                {!menu.collapsed && <span className="ml-2 text-wrap font-medium">{faker.music.songName()}</span>}
              </div>
            </div>
          </Link>
        ))}

      {visibleClubs < totalClubs && (
        <div className="mt-2 flex w-full justify-center">
          {menu.collapsed ? (
            <MenuButton button={{ to: "/clubs", icon: FaArrowUpRightFromSquare }} />
          ) : (
            <Anchor color="clear" to="/clubs" className="flex w-full items-center justify-center gap-2">
              Ver mais <FaArrowUpRightFromSquare />
            </Anchor>
          )}
        </div>
      )}
    </div>
  );
}
