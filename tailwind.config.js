const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
        sidebar: "#2B2E35",
        topbar: "#2B2E35",
        mainContent: "#212429",
        cardHeader: "#25262B",
        cardContent: "#2B2E35",
        fecGreen: "#00c39d",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
