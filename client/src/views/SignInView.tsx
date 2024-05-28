import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { Form } from "../components/form/index.tsx";
import { Input } from "../components/input/index.tsx";
import DialogLayout from "./layouts/DialogLayout";

export default function SignInView(): JSX.Element {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <DialogLayout>
      <Form.Container register={register} onSubmit={onSubmit}>
        <Input.Root name="teste">
          <Input.Label text="Teste" />
          <Input.Base>
            <Input.Icon icon={FaStar} />
            <Input.InputText />
          </Input.Base>
        </Input.Root>
        <Form.Submit />
      </Form.Container>
    </DialogLayout>
  );

  // // TODO: Adicionar stepper
  // const [step, setStep] = useState(1);
  // const showAtStep = (s: number): boolean => s !== step;
  // const totalSteps = 4;

  // const titles: string[] = [
  //   "Criar uma nova conta",
  //   "Criar uma nova conta",
  //   "Personalize o perfil",
  //   "Confirme as informações",
  // ];

  // return (
  //   <DialogLayout title={titles[step - 1]}>
  //     <Input
  //       label="Nome"
  //       icon={FaUser}
  //       helper="O nome que será exibido no seu perfil"
  //       hidden={showAtStep(1)}
  //     />
  //     <Input
  //       label="Nome de Usuário"
  //       icon={FaAt}
  //       helper="A sua tag única que te difere de outros usuários"
  //       hidden={showAtStep(1)}
  //     />
  //     <Input label="Email" icon={FaEnvelope} hidden={showAtStep(1)} />
  //     <Input label="Senha" icon={FaKey} hidden={showAtStep(2)} />
  //     <Input label="Confirme a Senha" icon={FaKey} hidden={showAtStep(2)} />
  //     <div
  //       className="relative mb-[2.5rem] h-28 w-full rounded-lg bg-orange-300"
  //       hidden={step < 3}
  //     >
  //       <Avatar
  //         rounded
  //         size="lg"
  //         className="absolute left-[50%] top-full translate-x-[-50%] translate-y-[-50%]"
  //       />
  //     </div>
  //     <Input
  //       label="Foto de Perfil"
  //       icon={FaImage}
  //       hidden={showAtStep(3)}
  //       optional
  //     />
  //     <Input
  //       label="Fundo de Perfil"
  //       icon={FaImage}
  //       hidden={showAtStep(3)}
  //       optional
  //     />
  //     <div hidden={showAtStep(4)}>
  //       <p className="text-center font-semibold">Nome do Usuário</p>
  //       <p className="text-center text-slate-700">@username</p>
  //     </div>
  //     {step > 1 && (
  //       <Button
  //         color="transparent"
  //         onClick={() => {
  //           setStep(step - 1);
  //         }}
  //       >
  //         Anterior
  //       </Button>
  //     )}
  //     <Button
  //       onClick={() => {
  //         setStep(step + 1);
  //       }}
  //     >
  //       {step < totalSteps ? "Próximo" : "Finalizar cadastro"}
  //     </Button>
  //     {step === 1 && (
  //       <>
  //         <Anchor path="/login">Já possui conta? Faça Login</Anchor>
  //         <Divider>ou</Divider>
  //         <Button color="transparent" icon={FcGoogle} disabled>
  //           Cadastre-se usando sua conta Google
  //         </Button>
  //       </>
  //     )}
  //     <Stepper totalSteps={totalSteps} step={step} setStep={setStep} />
  //   </DialogLayout>
  // );
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
