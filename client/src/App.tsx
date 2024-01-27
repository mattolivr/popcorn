import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import SignInView from "./views/SignInView";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginView} />
        <Route path="/" Component={null}>
          <Route path="/sign-in" Component={SignInView} />
          {/* TODO: Contruir leiaute padrão da aplicação (header) e reenderizar em / */}
          {/* <Route path="*" Component={HomeView}/> */}
          {/* <Route path="*" Component={NotFoundView}/> */}
        </Route>
      </Routes>
    </Router>
  );
}
