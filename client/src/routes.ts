import { createBrowserRouter } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { MainLayout } from "./pages/layouts/main/MainLayout";
import LoginPage from "./pages/LoginPage";
import MoviePage from "./pages/MoviePage";
import NotificationPage from "./pages/NotificationPage";
import SignUpPage from "./pages/SignUpPage";
import TVShowPage from "./pages/TVShowPage";

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
