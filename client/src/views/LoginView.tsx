import { FaKey, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Divider from "../components/Divider";
import Input from "../components/Input";
import WelcomeLayout from "./layouts/WelcomeLayout";

export default function LoginView() {
  return (
    <WelcomeLayout>
      <Card title="Faça o Login" className="w-full max-w-lg gap-2">
        {/* TODO: Criar componente de link */}
        <Input type="text" label="Nome de usuário ou Email" icon={FaUser} />
        <Input type="password" label="Senha" icon={FaKey} />
        <a href="" className="text-end font-semibold text-blue-600">
          Esqueceu a senha?
        </a>
        <Divider text="ou" />
        <Link
          to="/sign-in"
          className="rounded-2xl bg-sky-500 px-1 py-2 text-center font-semibold text-white"
        >
          Crie uma nova conta
        </Link>
        <Button color="white">Entre usando sua conta Google</Button>
        <Button color="white">Entre usando sua conta Letterboxd</Button>
      </Card>
    </WelcomeLayout>
  );
}
