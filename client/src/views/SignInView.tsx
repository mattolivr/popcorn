import { Avatar } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import {
  FaCakeCandles,
  FaImage,
  FaImagePortrait,
  FaKey,
  FaUser,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Anchor from "../components/Anchor.tsx";
import Button from "../components/button/Button.tsx";
import Divider from "../components/Divider.tsx";
import Form from "../components/form/Form.tsx";
import { Input } from "../components/input/Input.tsx";
import DialogLayout from "./layouts/DialogLayout";

enum Steps {
  LOGIN = 1,
  GENERAL = 2,
  PASSWORD = 3,
  PROFILE = 4,
  SUBMIT = 5,
}

export default function SignInView(): React.ReactNode {
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const [step, setStep] = useState(1);
  const totalSteps = Object.keys(Steps).length / 2;
  const showAtStep = (...steps: number[]): boolean => {
    let show = false;
    steps.forEach((s) => {
      if (s === step) {
        show = true;
      }
    });
    return show;
  };

  const nextStep = (): void => {
    // TODO: Adicionar foco ao primeiro input
    setStep(step + 1);
  };
  const previousStep = (): void => {
    setStep(step - 1);
  };

  const titles: string[] = [
    "Criar uma nova conta",
    "Preencha suas informações",
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
          name="tag"
          label="Nome de Usuário"
          icon={FaUser}
          hidden={!showAtStep(Steps.LOGIN)}
        />
        <Input
          name="email"
          label="Email"
          icon={FaEnvelope}
          hidden={!showAtStep(Steps.LOGIN)}
        />

        <Input
          name="name"
          label="Nome"
          icon={FaUser}
          hidden={!showAtStep(Steps.GENERAL)}
        />
        <Input
          name="birthday"
          label="Data de Nascimento"
          type="date"
          icon={FaCakeCandles}
          hidden={!showAtStep(Steps.GENERAL)}
        />

        <Input
          name="password"
          label="Senha"
          icon={FaKey}
          hidden={!showAtStep(Steps.PASSWORD)}
        />
        <Input
          name="passwordConfirm"
          label="Confirme a Senha"
          icon={FaKey}
          hidden={!showAtStep(Steps.PASSWORD)}
        />

        <ProfilePreview
          previewHidden={!showAtStep(Steps.PROFILE, Steps.SUBMIT)}
          userDataHidden={!showAtStep(Steps.SUBMIT)}
        />
        <Input
          name="photo"
          label="Foto de Perfil"
          type="file"
          icon={FaImagePortrait}
          hidden={!showAtStep(Steps.PROFILE)}
          optional
        />
        <Input
          name="background"
          label="Fundo de Perfil"
          type="file"
          icon={FaImage}
          hidden={!showAtStep(Steps.PROFILE)}
          optional
        />

        <Anchor to="/login" hidden={!showAtStep(Steps.LOGIN)}>
          Já tem uma conta? Faça Login
        </Anchor>

        <Button
          onClick={previousStep}
          color="transparent"
          hidden={showAtStep(Steps.LOGIN)}
        >
          Anterior
        </Button>
        <Button onClick={nextStep} hidden={showAtStep(totalSteps)}>
          Próximo
        </Button>

        <Form.Submit hidden={!showAtStep(totalSteps)}>
          Confirmar cadastro
        </Form.Submit>

        <LoginRedirect hidden={!showAtStep(1)} />
        <Stepper totalSteps={totalSteps} step={step} setStep={setStep} />
      </Form>
    </DialogLayout>
  );
}

function LoginRedirect({ hidden }: { hidden: boolean }): React.ReactNode {
  return (
    !hidden && (
      <>
        <Divider>ou</Divider>
        <Button color="transparent" icon={<Button.Icon icon={FcGoogle} />}>
          Cadastre-se usando sua conta Google
        </Button>
      </>
    )
  );
}

interface ProfilePreviewProps {
  previewHidden: boolean;
  userDataHidden: boolean;
}

function ProfilePreview(props: ProfilePreviewProps): React.ReactNode {
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

interface StepperProps {
  totalSteps: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function Stepper(props: StepperProps): React.ReactNode {
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
