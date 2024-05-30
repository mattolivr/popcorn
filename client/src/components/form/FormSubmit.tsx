import Button, { type ButtonProps } from "../button/Button";
import { useFormContext } from "./context";

export default function FormSubmit(props: ButtonProps): React.ReactNode {
  const formContext = useFormContext();
  let onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  if (formContext != null) {
    onSubmit = formContext.form.onSubmit;
  }

  if (props.hidden) {
    return <></>;
  }

  return (
    <Button
      {...props}
      onClick={() => {
        void onSubmit();
      }}
    >
      {props.children}
    </Button>
  );
}
