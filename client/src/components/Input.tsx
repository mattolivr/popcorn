import { isValidElement, useId, useState, type ComponentProps } from "react";
import { type IconType } from "react-icons";
import { type VariantProps } from "tailwind-variants";
import {
  inputBaseStyle,
  inputHelperStyle,
  inputIconStyle,
  inputLabelStyle,
  inputTagStyle,
} from "./Input.style";

// TODO: Limitar tipos de input
export type InputProps = ComponentProps<"input"> &
  Omit<
    VariantProps<typeof inputBaseStyle>,
    "status" | "hasLeftIcon" | "hasRightIcon" | "focus"
  > & {
    label?: string;
    helper?: string | JSX.Element;

    icon?: IconType;
    rIcon?: IconType;

    // TODO: Melhorar validator
    validator?: (value: any) => string | undefined;
    sanitizer?: (value: any) => any;
  };

export default function Input(props: InputProps): JSX.Element {
  const id = useId();
  const [focus, setFocus] = useState(false);
  const [status, setStatus] =
    useState<VariantProps<typeof inputBaseStyle>["status"]>("default");
  const [message, setMessage] = useState("");

  const type = props.type ?? "text";
  const helper = message === "" ? props.helper : message;

  const baseStyle = inputBaseStyle({
    status,
    hasLeftIcon: props.icon != null,
    hasRightIcon: props.rIcon != null,
    focus,
  });
  const iconStyle = inputIconStyle({ status });

  return (
    <>
      <Label label={props.label} id={id} />
      <div className={baseStyle}>
        <Icon icon={props.icon} style={iconStyle} />
        <input
          id={id}
          type={type}
          className={inputTagStyle}
          onInput={(e) => {
            onInputHandler(e, setStatus, setMessage, props.validator);
          }}
          onFocus={(e) => {
            onFocusHandler(e, setFocus, "focus", props.onFocus);
          }}
          onBlur={(e) => {
            onFocusHandler(e, setFocus, "blur", props.onFocus);
          }}
        />
        <Icon icon={props.rIcon} style={iconStyle} />
      </div>
      <Helper status={status}>{helper}</Helper>
    </>
  );
}

function Label({ label, id }: { label?: string; id: string }): JSX.Element {
  if (label == null) {
    return <></>;
  }
  return (
    <label htmlFor={id} className={inputLabelStyle}>
      {label}
    </label>
  );
}

interface IconProps {
  icon?: IconType;
  style: string;
}

function Icon({ icon, style }: IconProps): JSX.Element {
  if (icon == null) {
    return <></>;
  }
  return icon({ className: style });
}

function Helper({
  status,
  children,
}: {
  status: VariantProps<typeof inputBaseStyle>["status"];
  children?: string | JSX.Element;
}): JSX.Element {
  if (children == null) {
    return <></>;
  }
  if (isValidElement(children)) {
    return children;
  }
  return <p className={inputHelperStyle({ status })}>{children}</p>;
}

function onInputHandler(
  event: React.FormEvent<HTMLInputElement>,
  setStatus: React.Dispatch<
    React.SetStateAction<VariantProps<typeof inputBaseStyle>["status"]>
  >,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  validator?: (value: any) => string | undefined,
  sanitizer?: (value: any) => any,
): void {
  const value = event.currentTarget.value;

  if (validator != null) {
    const error = validator(value);
    setStatus(error != null ? "error" : "default");
    setMessage(error ?? "");
  }
  if (sanitizer != null) {
    event.currentTarget.value = sanitizer(event.currentTarget.value);
  }
}

function onFocusHandler(
  event: React.FocusEvent<HTMLInputElement, Element>,
  setFocus: React.Dispatch<React.SetStateAction<boolean>>,
  type: "focus" | "blur",
  onFocus?: React.FocusEventHandler<HTMLInputElement>,
): void {
  setFocus(type === "focus");
  if (onFocus != null) {
    onFocus(event);
  }
}
