import type { Config } from "tailwindcss";
import { COLORS } from "./utils/theme";

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "main-darker": COLORS.main_darker,
        "main-dark": COLORS.main_dark,
        main: COLORS.main,
        "main-light": COLORS.main_light,
        "main-lighter": COLORS.main_lighter,
      },
      fontFamily: {
        workSans: ["Rubik-Regular", "sans-serif"],
        "workSans-bold": ["WorkSans-Bold", "sans-serif"],
        "workSans-semibold": ["WorkSans-SemiBold", "sans-serif"],
        "workSans-light": ["WorkSans-Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
