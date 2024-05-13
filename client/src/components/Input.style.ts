import { tv } from "tailwind-variants";

export const inputBaseStyle = tv({
  base: "flex items-center rounded-lg w-full",
  variants: {
    status: {
      default: "bg-gray-100",
      error: "bg-red-100 text-red-800 placeholder-red-700",
      success: "bg-emerald-100 text-emerald-800 placeholder-emerald-700",
    },
    hasLeftIcon: {
      true: "pl-3",
    },
    hasRightIcon: {
      true: "pr-3",
    },
    focus: {
      true: "ring-2",
    },
  },
  compoundVariants: [
    {
      status: "default",
      focus: true,
      class: "ring-gray-300",
    },
    {
      status: "error",
      focus: true,
      class: "ring-red-200",
    },
    {
      status: "success",
      focus: true,
      class: "ring-emerald-200",
    },
  ],
  defaultVariants: {
    status: "default",
  },
});

export const inputTagStyle =
  "bg-transparent border-none focus:ring-transparent w-full h-10";

export const inputTextAreaStyle =
  "bg-transparent border-none focus:ring-transparent resize-none w-full min-h-10 h-10 max-h-40";

export const inputIconStyle = tv({
  base: "text-md",
  variants: {
    status: {
      default: "text-gray-600",
      error: "text-red-800",
      success: "",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

export const inputLabelStyle = "font-medium mb-1";
export const inputHelperStyle = tv({
  base: "mt-2 text-sm",
  variants: {
    status: {
      default: "text-gray-500",
      error: "text-red-500",
      success: "text-emerald-500",
    },
  },
  defaultVariants: {
    status: "default",
  },
});
