import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function App(): React.ReactNode {
  return <RouterProvider router={router} />;
}
