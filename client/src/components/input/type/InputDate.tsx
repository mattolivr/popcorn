import { Datepicker, type CustomFlowbiteTheme } from "flowbite-react";
import { useRef, useState, type InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { useFormContext } from "../../form/context";
import { useInputContext } from "../context";
import { getRegisterProps } from "./input";

export function InputDate(
  props: InputHTMLAttributes<HTMLInputElement>,
): React.ReactNode {
  const { input } = useInputContext();
  const { form } = useFormContext() ?? { form: undefined };
  const { onFocus, onBlur, onClick, ...rest } = props;

  const [pickerVisible, setPickerVisible] = useState(false);
  const value = useRef<Date | string>("");

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    // setPickerVisible(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ): void => {
    setPickerVisible(true);
    if (onClick) {
      onClick(e);
    }
  };

  const registerProps = getRegisterProps(input, handleBlur, form);

  return (
    <div className="relative flex w-full flex-col">
      <input
        type="button"
        className={inputTextStyle({ className: props.className })}
        onClick={handleClick}
        value={
          typeof value.current === "string"
            ? value.current
            : value.current.toLocaleDateString()
        }
        {...registerProps}
        {...rest}
      />
      {pickerVisible && (
        <Datepicker
          className="absolute top-full focus:bg-red-100"
          language="pt-BR"
          labelClearButton="Limpar"
          labelTodayButton="Hoje"
          defaultDate={
            typeof value.current === "string" ? undefined : value.current
          }
          theme={datePickerTheme}
          onSelectedDateChanged={(date: Date) => {
            value.current = date;
            setPickerVisible(false);
          }}
          inline
        />
      )}
    </div>
  );
}

const inputTextStyle = tv({
  base: "bg-transparent border-none focus:ring-transparent h-10 p-0 text-left",
});

const datePickerTheme: CustomFlowbiteTheme["datepicker"] = {
  root: {
    base: "relative",
  },
  popup: {
    root: {
      base: "absolute top-10 z-50 block pt-2",
      inline: "relative top-0 z-auto",
      inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
    },
    header: {
      base: "",
      title:
        "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
      selectors: {
        base: "mb-2 flex justify-between",
        button: {
          base: "rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
          prev: "",
          next: "",
          view: "",
        },
      },
    },
    view: {
      base: "p-1",
    },
    footer: {
      base: "mt-2 flex space-x-2",
      button: {
        base: "w-full rounded-xl px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-sky-300",
        today:
          "bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700",
        clear:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
      },
    },
  },
  views: {
    days: {
      header: {
        base: "mb-1 grid grid-cols-7",
        title:
          "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
      },
      items: {
        base: "grid w-64 grid-cols-7",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-sky-500 text-white hover:bg-sky-600",
          disabled: "text-gray-500",
        },
      },
    },
    months: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-sky-500 text-white hover:bg-sky-600",
          disabled: "text-gray-500",
        },
      },
    },
    years: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-sky-500 text-white hover:bg-sky-600",
          disabled: "text-gray-500",
        },
      },
    },
    decades: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-sky-500 text-white hover:bg-sky-600",
          disabled: "text-gray-500",
        },
      },
    },
  },
};
