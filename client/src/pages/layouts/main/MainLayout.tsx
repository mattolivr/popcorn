import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Aside from "../../../components/layout/aside/Aside";
import { AsideProvider } from "../../../components/layout/aside/context";
import { MenuProvider } from "../../../components/layout/menu/context";
import Menu from "../../../components/layout/menu/Menu";
import { useAuth } from "../../../core/hooks/auth.hook";
import { MainLayoutBottomNavigation } from "./MainLayoutBottomNavigation";
import MainLayoutHeader from "./MainLayoutHeader";

export function MainLayout(): React.ReactNode {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    auth.validate().then((resp) => {
      if (!resp.token) {
        navigate("/login");
      }
    });
  }, [location]);

  return (
    auth.token && (
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
