const colors: Color[] = [
  {
    variant: "primary",

    background: "[#38bdf8]",
    outline: "red-800",
    text: "white",

    hover_background: "red-100",
  },
  {
    variant: "secondary",

    background: "transparent",
    border: { color: "sky-500", size: 2 },
    text: "stone-900",

    hover_background: "sky-500",
  },
  {
    variant: "white",

    shadow: "sm",
    background: "white",
    border: { color: "gray-500" },
    outline: "gray-400",
    text: "stone-900",

    hover_background: "gray-100",
  },
];

/**
 * Gera o className a partir de um objeto Color
 * @param color Cor para gerar o className
 */
export function getColor(variant?: Variant, color?: Color) {
  if (variant != null) {
    color = colors.find((c) => c.variant === variant);
  }

  if (color == null || (variant == null && color == null)) {
    return " ";
  }
  return getColorByObject(color);
}

function getColorByObject(color: Color): string {
  // return outline-red-800 text-white hover:bg-red-100 justify-center w-full";
  let className: string = "";

  Object.keys(color).forEach((key) => {
    const prop = (colorProps as any)[key];
    const value = (color as any)[key];

    if (prop == null || prop === "variant") {
      return;
    }

    if (typeof value === "string") {
      className += ` ${prop}-${value}`;
    } else {
      Object.keys(value as object).forEach((v) => {
        className += ` ${prop}-${value[v]}`;
      });
    }
  });

  return className + " ";
}

export type Variant = "primary" | "secondary" | "white" | "blank";

export interface Color {
  variant: Variant;

  shadow?: string;

  background?: string;
  border?: { color: string; size?: number };
  outline?: string;
  text?: string;

  d_background?: string;
  d_border?: { color: string; size?: number };
  d_outline?: string;
  d_text?: string;

  hover_background?: string;
  hover_border?: { color: string; size?: number };
  hover_outline?: string;
  hover_text?: string;

  hover_d_background?: string;
  hover_d_border?: { color: string; size?: number };
  hover_d_outline?: string;
  hover_d_text?: string;

  focus_background?: string;
  focus_border?: { color: string; size?: number };
  focus_outline?: string;
  focus_text?: string;

  focus_d_background?: string;
  focus_d_border?: { color: string; size?: number };
  focus_d_outline?: string;
  focus_d_text?: string;

  disabled_background?: string;
  disabled_border?: { color: string; size?: number };
  disabled_outline?: string;
  disabled_text?: string;

  disabled_d_background?: string;
  disabled_d_border?: { color: string; size?: number };
  disabled_d_outline?: string;
  disabled_d_text?: string;
}

const colorProps = {
  shadow: "shadow",

  background: "bg",
  border: "border",
  outline: "outline",
  text: "text",

  d_background: "dark:bg",
  d_border: "dark:border",
  d_outline: "dark:outline",
  d_text: "dark:text",

  hover_background: "hover:bg",
  hover_border: "hover:border",
  hover_outline: "hover:outline",
  hover_text: "hover:text",

  hover_d_background: "hover:dark:bg",
  hover_d_border: "hover:dark:border",
  hover_d_outline: "hover:dark:outline",
  hover_d_text: "hover:dark:text",

  focus_background: "focus:bg",
  focus_border: "focus:border",
  focus_outline: "focus:outline",
  focus_text: "focus:text",

  focus_d_background: "focus:dark:",
  focus_d_border: "focus:dark:border",
  focus_d_outline: "focus:dark:outline",
  focus_d_text: "focus:dark:text",

  disabled_background: "disabled:bg",
  disabled_border: "disabled:border",
  disabled_outline: "disabled:outline",
  disabled_text: "disabled:text",

  disabled_d_background: "disabled:dark:bg",
  disabled_d_border: "disabled:dark:border",
  disabled_d_outline: "disabled:dark:outline",
  disabled_d_text: "disabled:dark:text",
};
