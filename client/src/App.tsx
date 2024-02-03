import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import SignInView from "./views/SignInView";

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import HomeView from "./views/HomeView";
import WelcomeView from "./views/WelcomeView";
import { MainLayout } from "./views/layouts/MainLayout";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function App() {
  const logged = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginView} />
        <Route path="/sign-in" Component={SignInView} />
        <Route path="/" Component={HomeView} />
        {/* <Route path="*" Component={HomeView}/> */}
        {/* <Route path="*" Component={NotFoundView}/> */}
      </Routes>
    </Router>
  );
}

interface MainProps {
  children: React.ReactNode;
  logged: boolean;
}

function Main({ children, logged }: MainProps) {
  if (!logged) {
    return <Route path="/" Component={WelcomeView} />;
  }

  return (
    <Route path="/">
      <MainLayout>{children}</MainLayout>
    </Route>
  );
}
