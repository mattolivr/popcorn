import { Alert } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaExclamationCircle, FaKey, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Form from "../components/form/Form";
import { Input } from "../components/input/Input";
import { InputText } from "../components/input/InputText";
import DialogLayout from "./layouts/DialogLayout";

export default function LoginView(): JSX.Element {
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const [error] = useState(false);

  return (
    <DialogLayout title="Entre ou Cadastre-se">
      <Form
        register={register}
        onSubmit={onSubmit}
        formState={formState}
        className="flex flex-col gap-2"
      >
        <Input
          name="username"
          label={<Input.Label text="Nome" />}
          type={<InputText />}
          icon={<Input.Icon icon={FaUser} />}
        />
        <Input
          name="password"
          label={<Input.Label text="Senha" />}
          type={<InputText />}
          icon={<Input.Icon icon={FaKey} />}
        />
        <Anchor to="#" className="text-right">
          Esqueceu a senha?
        </Anchor>
        <Anchor to="/sign-in">Não possui conta? Cadastre-se</Anchor>
        <Form.Submit>Fazer Login</Form.Submit>
      </Form>

      {error && (
        <Alert color="failure" icon={FaExclamationCircle}>
          <span className="font-medium">Nome de usuário ou senha incorretos</span>
        </Alert>
      )}
      <Divider>ou</Divider>
      <Button color="transparent" icon={FcGoogle}>
        Entre usando sua conta Google
      </Button>
    </DialogLayout>
  );
}
