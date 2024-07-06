import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuProvider } from "../../../components/menu/context";
import Menu from "../../../components/menu/Menu";
import { useAuth } from "../../../hooks/auth.hook";
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
        <div className="flex min-h-dvh w-full flex-col bg-gray-200">
          <MainLayoutHeader />
          <div className="relative flex flex-row">
            <Menu />
            <div className="relative mb-12 flex grow justify-start sm:mb-0">
              <Outlet />
            </div>
          </div>
          <MainLayoutBottomNavigation />
        </div>
      </MenuProvider>
    )
  );
}
