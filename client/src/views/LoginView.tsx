import { useForm } from "react-hook-form";
import { FaKey, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { validateEmail } from "../classes/input.validator";
import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Card from "../components/Card";
import Divider from "../components/Divider";
import Input from "../components/Input";
import WelcomeLayout from "./layouts/WelcomeLayout";

export default function LoginView() {
  const { register, handleSubmit } = useForm();

  return (
    <WelcomeLayout>
      <Card title="Faça o Login" className="max-w-lg gap-2">
        {/* TODO: Criar componente de link */}
        <Input
          type="text"
          name="login"
          label="Nome de usuário ou Email"
          icon={FaUser}
          register={register}
          validator={validateEmail}
        />
        <Input
          type="password"
          name="password"
          label="Senha"
          icon={FaKey}
          register={register}
        />
        <Anchor path="#" className="text-right">
          Esqueceu a senha?
        </Anchor>
        <Button>Fazer login</Button>
        <Anchor path="/sign-in">Não possui conta? Cadastre-se</Anchor>
        <Divider text="ou" />
        <Button variant="blank" icon={FcGoogle} disabled>
          Entre usando sua conta Google
        </Button>
      </Card>
    </WelcomeLayout>
  );
}
