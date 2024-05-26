import { Avatar } from "flowbite-react";
import { useState } from "react";
import { FaAt, FaEnvelope, FaImage, FaKey, FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Input from "../components/Input";
import DialogLayout from "./layouts/DialogLayout";

export default function SignInView(): JSX.Element {
  // TODO: Adicionar stepper
  const [step, setStep] = useState(1);
  const titles: string[] = [
    "Criar uma nova conta",
    "Criar uma nova conta",
    "Personalize o perfil",
    "Confirme as informações",
  ];
  const totalSteps = 4;

  const stepProps: StepProps = {
    step,
    setStep,
  };

  return (
    <DialogLayout title={titles[step - 1]}>
      <Step1 {...stepProps} />
      <Step2 {...stepProps} />
      <Step3 {...stepProps} />
      <Step4 {...stepProps} />
      {step > 1 && (
        <Button
          color="transparent"
          onClick={() => {
            setStep(step - 1);
          }}
        >
          Anterior
        </Button>
      )}
      <Button
        onClick={() => {
          setStep(step + 1);
        }}
      >
        {step < totalSteps ? "Próximo" : "Finalizar cadastro"}
      </Button>
      {step === 1 && (
        <>
          <Anchor path="/login">Já possui conta? Faça Login</Anchor>
          <Divider>ou</Divider>
          <Button color="transparent" icon={FcGoogle} disabled>
            Cadastre-se usando sua conta Google
          </Button>
        </>
      )}
      <Stepper totalSteps={totalSteps} step={step} setStep={setStep} />
    </DialogLayout>
  );
}

interface StepProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function Step1(props: StepProps): JSX.Element {
  const { step } = props;
  if (step === 1) {
    return (
      <>
        <Input
          label="Nome"
          icon={FaUser}
          helper="O nome que será exibido no seu perfil"
        />
        <Input
          label="Nome de Usuário"
          icon={FaAt}
          helper="A sua tag única que te difere de outros usuários"
        />
        <Input label="Email" icon={FaEnvelope} />
      </>
    );
  }
  return <></>;
}

function Step2(props: StepProps): JSX.Element {
  const { step } = props;
  if (step === 2) {
    return (
      <>
        <Input label="Senha" icon={FaKey} />
        <Input label="Confirme a Senha" icon={FaKey} />
      </>
    );
  }
  return <></>;
}

function Step3(props: StepProps): JSX.Element {
  const { step } = props;
  if (step === 3) {
    return (
      <>
        <div className="relative mb-[2.5rem] h-28 w-full rounded-lg bg-orange-300">
          <Avatar
            rounded
            size="lg"
            className="absolute left-[50%] top-full translate-x-[-50%] translate-y-[-50%]"
          />
        </div>
        <Input label="Foto de Perfil" icon={FaImage} optional />
        <Input label="Fundo de Perfil" icon={FaImage} optional />
      </>
    );
  }
  return <></>;
}

function Step4(props: StepProps): JSX.Element {
  const { step } = props;
  if (step === 4) {
    return (
      <>
        <div className="relative mb-[2.5rem] h-28 w-full rounded-lg bg-orange-300">
          <Avatar
            rounded
            size="lg"
            className="absolute left-[50%] top-full translate-x-[-50%] translate-y-[-50%]"
          />
        </div>
        <div className="">
          <p className="text-center font-semibold">Nome do Usuário</p>
          <p className="text-center text-slate-700">@username</p>
        </div>
      </>
    );
  }
  return <></>;
}

function Stepper(props: {
  totalSteps: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
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
