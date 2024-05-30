import { Avatar } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { FaAt, FaImage, FaImagePortrait, FaKey, FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Anchor from "../components/Anchor.tsx";
import Button from "../components/Button.tsx";
import Divider from "../components/Divider.tsx";
import Form from "../components/form/Form.tsx";
import { Input } from "../components/input/Input.tsx";
import { InputText } from "../components/input/InputText.tsx";
import DialogLayout from "./layouts/DialogLayout";

export default function SignInView(): React.ReactNode {
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const showAtStep = (s: number): boolean => s !== step;
  const nextStep = (): void => {
    setStep(step + 1);
  };
  const previousStep = (): void => {
    setStep(step - 1);
  };

  const titles: string[] = [
    "Criar uma nova conta",
    "Formule uma senha",
    "Personalize o perfil",
    "Confirme as informações",
  ];

  return (
    <DialogLayout title={titles[step - 1]}>
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
          hidden={showAtStep(1)}
        />
        <Input
          name="usertag"
          label={<Input.Label text="Tag de Usuário" />}
          type={<InputText />}
          icon={<Input.Icon icon={FaAt} />}
          hidden={showAtStep(1)}
        />
        <Input
          name="email"
          label={<Input.Label text="Email" />}
          type={<InputText />}
          icon={<Input.Icon icon={FaEnvelope} />}
          hidden={showAtStep(1)}
        />
        <Input
          name="password"
          label={<Input.Label text="Senha" />}
          type={<InputText />}
          icon={<Input.Icon icon={FaKey} />}
          hidden={showAtStep(2)}
        />
        <Input
          name="passwordConfirm"
          label={<Input.Label text="Confirme a Senha" />}
          type={<InputText />}
          icon={<Input.Icon icon={FaKey} />}
          hidden={showAtStep(2)}
        />
        <ProfilePreview
          previewHidden={showAtStep(3) && showAtStep(4)}
          userDataHidden={showAtStep(4)}
        />
        <Input
          name="photo"
          label={<Input.Label text="Foto de Perfil" />}
          type={<InputText />}
          icon={<Input.Icon icon={FaImagePortrait} />}
          hidden={showAtStep(3)}
          optional
        />
        <Input
          name="background"
          label={<Input.Label text="Fundo de Perfil" />}
          type={<InputText />}
          icon={<Input.Icon icon={FaImage} />}
          hidden={showAtStep(3)}
          optional
        />
        <Anchor to="/login" hidden={showAtStep(1)}>
          Já tem uma conta? Faça Login
        </Anchor>
        <Button onClick={previousStep} color="transparent" hidden={!showAtStep(1)}>
          Anterior
        </Button>
        <Button onClick={nextStep} hidden={!showAtStep(4)}>
          Próximo
        </Button>
        <Form.Submit hidden={showAtStep(totalSteps)}>Confirmar cadastro</Form.Submit>
        <LoginRedirect hidden={showAtStep(1)} />
        <Stepper totalSteps={totalSteps} step={step} setStep={setStep} />
      </Form>
    </DialogLayout>
  );
}

function LoginRedirect({ hidden }: { hidden: boolean }): React.ReactNode {
  if (hidden) {
    return <></>;
  }

  return (
    <>
      <Divider>ou</Divider>
      <Button color="transparent" icon={FcGoogle}>
        Cadastre-se usando sua conta Google
      </Button>
    </>
  );
}

function ProfilePreview(props: {
  previewHidden: boolean;
  userDataHidden: boolean;
}): React.ReactNode {
  const { previewHidden, userDataHidden } = props;
  return (
    <>
      <div
        className="relative mb-[2.5rem] h-28 w-full rounded-lg bg-orange-300"
        hidden={previewHidden}
      >
        <div
          className="absolute left-[50%] top-full translate-x-[-50%] translate-y-[-50%] 
            rounded-full bg-white p-1"
        >
          <Avatar rounded size="lg" className="" />
        </div>
      </div>
      <div hidden={userDataHidden}>
        <p className="text-center font-semibold">Nome do Usuário</p>
        <p className="text-center text-slate-700">@username</p>
      </div>
    </>
  );
}

function Stepper(props: {
  totalSteps: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}): React.ReactNode {
  const { totalSteps, step, setStep } = props;

  let steps: Array<{ index: number; active: boolean }> = [];
  for (let index = 0; index < totalSteps; index++) {
    steps = steps.concat({ index, active: index === step - 1 });
  }

  return (
    <ul className="flex justify-center gap-1">
      {steps.map((s) => (
        <li key={s.index}>
          <button
            className={`h-3 w-3 rounded-full ${s.active ? "bg-sky-300" : "bg-slate-400"}`}
            onClick={() => {
              setStep(s.index + 1);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
