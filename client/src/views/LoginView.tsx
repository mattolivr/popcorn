import { FaKey, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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
        <a href="" className="text-end font-semibold text-sky-700">
          Esqueceu a senha?
        </a>
        <Button>Fazer login</Button>
        <Link to="/sign-in" className="text-center font-semibold text-sky-700">
          Não possui conta? Cadastre-se
        </Link>
        <Divider text="ou" />
        <Button variant="blank" icon={FcGoogle} disabled>
          Entre usando sua conta Google
        </Button>
      </Card>
    </WelcomeLayout>
  );
}
