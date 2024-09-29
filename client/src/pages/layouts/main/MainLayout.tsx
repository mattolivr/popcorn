import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Aside from "../../../components/ui/aside/Aside";
import { AsideProvider } from "../../../components/ui/aside/context";
import { MenuProvider } from "../../../components/ui/menu/context";
import Menu from "../../../components/ui/menu/Menu";
import { useAuth } from "../../../hooks/auth.hook";
import { MainLayoutBottomNavigation } from "./MainLayoutBottomNavigation";
import MainLayoutHeader from "./MainLayoutHeader";

export function MainLayout(): React.ReactNode {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("require_login", process.env.require_login);
    if (process.env.require_login === "false") {
      setLoggedIn(true);
      return;
    }

    auth.validate().then((resp) => {
      if (resp.token) {
        setLoggedIn(true);
      } else {
        navigate("/login");
      }
    });
  }, [location]);

  return (
    loggedIn && (
      <MenuProvider>
        <AsideProvider>
          <div className="flex min-h-dvh w-full flex-col bg-gray-200">
            <MainLayoutHeader />
            <div className="relative flex flex-row">
              <Menu />
              <div className="flex grow flex-col justify-start overflow-x-hidden">
                <Outlet />
              </div>
              <Aside />
            </div>
            <MainLayoutBottomNavigation />
          </div>
        </AsideProvider>
      </MenuProvider>
    )
  );
}
