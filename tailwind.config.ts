import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        green: {
          DEFAULT: "#1D9E75",
          dark: "#0F6E56",
          darker: "#085041",
          light: "#5DCAA5",
          pale: "#E1F5EE",
        },
        amber: {
          xray: "#EF9F27",
          dark: "#BA7517",
        },
        red: {
          xray: "#E24B4A",
          dark: "#A32D2D",
        },
        bg: {
          DEFAULT: "#080808",
          2: "#101010",
          3: "#181818",
          4: "#1f1f1f",
        },
        border: {
          DEFAULT: "#242424",
          2: "#2e2e2e",
        },
        muted: {
          DEFAULT: "#4a4a48",
          2: "#787672",
          3: "#a0a09a",
        },
        text: {
          DEFAULT: "#ebebeb",
          2: "#b8b8b0",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
