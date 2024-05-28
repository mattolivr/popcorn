import { Alert } from "flowbite-react";
import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Divider from "../components/Divider";
// import Input from "../components/Input";
import DialogLayout from "./layouts/DialogLayout";

export default function LoginView(): JSX.Element {
  const [error] = useState(false);

  return (
    <DialogLayout title="Entre ou Cadastre-se">
      <img
        src="/src/assets/storyset/watching.svg"
        className="my-4 max-h-[20rem] w-auto"
      />
      {/* <Input
        type="text"
        name="login"
        label="Nome de usuário ou Email"
        icon={FaUser}
      />
      <Input type="password" name="password" label="Senha" icon={FaKey} /> */}
      <Anchor path="#" className="text-right">
        Esqueceu a senha?
      </Anchor>
      <Button>Fazer login</Button>
      {error && (
        <Alert color="failure" icon={FaExclamationCircle}>
          <span className="font-medium">
            Nome de usuário ou senha incorretos
          </span>
        </Alert>
      )}
      <Anchor path="/sign-in">Não possui conta? Cadastre-se</Anchor>
      <Divider>ou</Divider>
      <Button color="transparent" icon={FcGoogle} disabled>
        Entre usando sua conta Google
      </Button>
    </DialogLayout>
  );
}
