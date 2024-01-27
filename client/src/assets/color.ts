const colors = new Map<string, color>([
  ["primary", { color: "sky-500", text: "white", darkText: "stone-900" }],
  ["secundary", { color: "orange-300", text: "white", darkText: "stone-900" }],

  ["white", { color: "white", text: "stone-900" }],
]);

interface color {
  color: string;
  text?: string;
  darkColor?: string;
  darkText?: string;
}

export default colors;
