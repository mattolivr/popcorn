import { useEffect } from "react";
import { RouterProvider, useLocation } from "react-router-dom";
import { router } from "./routes";

const useRouteChange = (action: () => void) => {
  const location = useLocation();

  useEffect(() => {
    action();
  }, [location, action]);
};

const MyComponent = () => {
  useRouteChange(() => {
    console.log("Route changed!");
    // Coloque aqui a função que você quer executar
  });

  return <div>Meu Componente</div>;
};

export default function App(): React.ReactNode {
  return <RouterProvider router={router} />;
}
