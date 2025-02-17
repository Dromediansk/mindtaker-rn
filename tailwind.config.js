/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "main-darker": "#197499",
        "main-dark": "#2094c3",
        main: "#61bee4",
        "main-light": "#b5e1f2",
        "main-lighter": "#dff2f9",
      },
    },
  },
  plugins: [],
};
