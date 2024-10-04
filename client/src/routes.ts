import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import { MainLayout } from "./pages/layouts/main/MainLayout";
import ChatPage from "./pages/main/ChatPage";
import HomePage from "./pages/main/HomePage";
import NotificationPage from "./pages/main/NotificationPage";
import MoviePage from "./pages/media/MoviePage";
import TVShowPage from "./pages/media/TVShowPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "notifications",
        Component: NotificationPage,
      },
      {
        path: "messages",
        Component: ChatPage,
      },
      {
        path: "movies/:id",
        Component: MoviePage,
      },
      {
        path: "shows/:id",
        Component: TVShowPage,
      },
    ],
  },
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path: "signup",
    Component: SignUpPage,
  },
]);
