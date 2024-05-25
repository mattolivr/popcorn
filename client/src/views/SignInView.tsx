import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { FaAt, FaCalendar, FaImage, FaKey, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import type User from "../../../src/core/entities/user.entity";
import { server } from "../adapters/server";
import Button from "../components/Button";
import Card from "../components/Card";
import Divider from "../components/Divider";
import Input from "../components/Input";
import DialogLayout from "./layouts/DialogLayout";

export default function SignInView() {
  const [step, setStep] = useState(1);
  const stepRange = [1, 3];
  const nextStep = () => {
    if (step < stepRange[1]) {
      setStep(step + 1);
    }
  };
  const previousStep = () => {
    if (step > stepRange[0]) {
      setStep(step - 1);
    }
  };

  const title = [
    "Criar nova conta",
    "Definir uma senha",
    "Escolher uma foto de perfil",
  ];

  const { handleSubmit, register } = useForm();
  const handleSignIn: SubmitHandler<FieldValues> = async (
    data: FieldValues,
  ) => {
    console.log(data);

    const user: User = {
      name: data.name,
      email: data.email,
    };

    console.log("chamando servidor", "/user", user);
    const reply = await server.post("/user", user);
    console.log("resposta do servidor: ", reply);
  };

  return (
    <DialogLayout>
      <Card title={title[step - 1]} className="max-w-lg gap-2">
        <form
          className="flex flex-col gap-2"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Input
            type="text"
            label="Nome de usuário"
            name="name"
            icon={FaUser}
            visible={step === 1}
            register={register}
            required
          />
          <Input
            type="email"
            label="Email"
            name="email"
            icon={FaAt}
            visible={step === 1}
            register={register}
            required
          />
          <Input
            type="date"
            label="Data de Nascimento"
            name="birth"
            icon={FaCalendar}
            visible={step === 1}
            register={register}
            required
          />
          <Input
            type="password"
            label="Senha"
            name="password"
            icon={FaKey}
            visible={step === 2}
            register={register}
            required
          />
          <Input
            type="password"
            label="Confirme a senha"
            name="password_confirm"
            icon={FaKey}
            visible={step === 2}
            register={register}
            required
          />
          <Input
            type="file"
            label="Foto de Perfil (opcional)"
            name="avatar"
            icon={FaImage}
            visible={step === 3}
            register={register}
          />
          <Button
            variant="blank"
            onClick={previousStep}
            visible={step > stepRange[0]}
          >
            Voltar
          </Button>
          <Button onClick={nextStep} visible={step < stepRange[1]}>
            Próxima etapa
          </Button>
          <Button
            type="submit"
            onClick={nextStep}
            visible={step === stepRange[1]}
          >
            Finalizar Cadastro
          </Button>
        </form>

        <Link to="/login" className="text-center font-semibold text-sky-700">
          Já possui uma conta? Faça login
        </Link>
        <Divider text="ou"></Divider>
        <Button variant="blank" icon={FcGoogle} disabled>
          Entre usando sua conta Google
        </Button>
      </Card>
    </DialogLayout>
  );
}
