import { useId, useState } from "react";
import { type InputType } from ".";
import InputContext from "./context";

interface InputRootProps {
  children: React.ReactNode;
  name?: string;
  hidden?: boolean;
  optional?: boolean;
}

export function InputRoot(props: InputRootProps): React.ReactNode {
  const { children, name, hidden, optional } = props;

  const id = useId();
  const [focus, setFocus] = useState(false);

  if (hidden != null && hidden) {
    return <></>;
  }

  const input: InputType = {
    id,
    name,
    state: "default",
    focus: { focus, setFocus },
    optional,
  };

  return (
    <InputContext.Provider value={{ input }}>
      <div className="flex flex-col">{children}</div>
    </InputContext.Provider>
  );
}
