import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
