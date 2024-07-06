import { ReactNode } from "react";
import { FaCircleInfo, FaDoorOpen, FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import { ButtonProps } from "../button/Button";
import { MenuButton } from "./MenuButton";

export default function MenuBottomLinks(): ReactNode {
  const auth = useAuth();
  const navigate = useNavigate();

  const bottomLinks: ButtonProps[] = [
    {
      icon: FaGear,
      children: "Configurações",
      to: "/settings",
    },
    {
      icon: FaCircleInfo,
      children: "Sobre",
      to: "/about",
    },
    {
      icon: FaDoorOpen,
      children: "Sair",
      onClick: () => {
        auth.logout();
        // TODO: Navegar para LandingPage
        navigate("/login");
      },
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      {bottomLinks.map((btn, index) => (
        <MenuButton key={index} button={btn} />
      ))}
    </div>
  );
}
