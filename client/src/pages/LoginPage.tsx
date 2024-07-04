import { Alert } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaExclamationCircle, FaKey, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Anchor from "../components/Anchor";
import Button from "../components/button/Button";
import Divider from "../components/Divider";
import Form from "../components/form/Form";
import { Input } from "../components/input/Input";
import { useAuth } from "../hooks/auth.hook";
import { AuthLoginRequest, AuthLoginResponse } from "../hooks/auth.hook.interfaces";
import DialogLayout from "./layouts/DialogLayout";

export default function LoginPage(): JSX.Element {
  const [response, setResponse] = useState<AuthLoginResponse>();
  const { register, handleSubmit, formState } = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const request: AuthLoginRequest = {
      email: data.email,
      password: data.password,
    };
    setResponse(await auth.login(request));
    navigate("/");
  });

  return (
    <DialogLayout title="Faça login">
      {response && !response.token && (
        <Alert color="failure" icon={FaExclamationCircle}>
          <span className="font-medium">{response?.message}</span>
        </Alert>
      )}

      <Form register={register} onSubmit={onSubmit} formState={formState} className="flex flex-col gap-2">
        <Input name="email" label="Email" icon={FaUser} />
        <Input name="password" label="Senha" icon={FaKey} />

        <Anchor to="#" className="text-right">
          Esqueceu a senha?
        </Anchor>
        <Anchor to="/signup">Não possui conta? Cadastre-se</Anchor>

        <Form.Submit>Fazer Login</Form.Submit>
      </Form>

      <Divider>ou</Divider>
      <Button color="transparent" icon={<Button.Icon icon={FcGoogle} />}>
        Entre usando sua conta Google
      </Button>
    </DialogLayout>
  );
}
