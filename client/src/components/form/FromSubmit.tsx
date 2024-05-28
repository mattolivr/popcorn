import { useFormContext } from "./context";

export default function FormSubmit(): React.ReactNode {
  const formContext = useFormContext();
  let onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  if (formContext != null) {
    onSubmit = formContext.form.onSubmit;
  }

  return (
    <button
      onClick={() => {
        void onSubmit();
      }}
    >
      Submit
    </button>
  );
}
