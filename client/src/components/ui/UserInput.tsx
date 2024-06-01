import { Avatar } from "flowbite-react";
import { type FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import Form from "../form/Form";
import { Input } from "../input/Input";
import { InputText } from "../input/type/InputText";

export default function UserInput(): JSX.Element {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data: FieldValues) => {
    console.log(data);
  });

  return (
    <Form register={register} onSubmit={onSubmit}>
      <div className="flex gap-2">
        {/* // TODO: Mudar para componente wrapper para criar link automático */}
        <Link to="/users">
          <Avatar rounded />
        </Link>
        {/* // TODO: Mudar para input textArea */}
        <Input name="input" type={<InputText />} className="grow" />
      </div>
      <div className="mt-2 flex justify-end gap-1">
        <Button color="transparent">Limpar</Button>
        <Form.Submit className="justify-self-end">Enviar</Form.Submit>
      </div>
    </Form>
  );
}
