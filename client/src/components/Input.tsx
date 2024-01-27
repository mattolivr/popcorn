import { HTMLInputTypeAttribute } from "react";
import { IconType } from "react-icons";

type Props = {
  label?: string;
  type: HTMLInputTypeAttribute;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  hint?: string;
  action?: Action;
  icon?: IconType;
};

type Action = { name: string; function: () => void };

export default function Input(props: Props) {
  return (
    <>
      <div className="relative flex w-full">
        {props.label}
        <input
          type="email"
          className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="Enter name"
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          <svg
            className="flex-shrink-0 w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
    </>
  );
}
