import { createBrowserRouter } from "react-router-dom";
import ErrorView from "./views/ErrorView";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import MessageView from "./views/MessageView";
import MovieView from "./views/MovieView";
import NotificationView from "./views/NotificationView";
import SignInView from "./views/SignInView";
import { MainLayout } from "./views/layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: ErrorView(),
    children: [
      {
        path: "/",
        Component: HomeView,
      },
      {
        path: "notifications",
        Component: NotificationView,
      },
      {
        path: "messages",
        Component: MessageView,
      },
      {
        path: "movies/:id",
        Component: MovieView,
      },
    ],
  },
  {
    path: "login",
    Component: LoginView,
  },
  {
    path: "sign-in",
    Component: SignInView,
  },
]);
