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
        // Dashboard
        sidebar: "#171D24",
        topbar: "#171D24",
        mainContent: "#010409",
        // Text Colors
        mainTextColor: colors.teal[200],
        logoTextColor: colors.white,
        // Cards
        cardHeader: "#161B22",
        cardContent: "#161B22",
        cardContentLight: "#0D1117",
        // Others
        fecGreen: "#00c39d",
        dividerColor: colors.teal[600],
        addTimeslot: "#215188",
        // Navigation colors
        hoverNavigation: colors.teal[800],
        hoverNavigationText: colors.white,
        activeNavigation: colors.teal[600],
        activeNavigationText: colors.white,
        // Primary Button colors
        mainBtnTxt: colors.teal[200],
        mainBtnColor: colors.teal[600],
        mainBtnHoverColor: colors.teal[800],
        mainBtnActiveColor: colors.teal[600],
        // Secondary Button colors
        secondarynBtnTxt: "#010409",
        secondaryBtnColor: colors.white,
        secondaryBtnHoverColor: colors.teal[800],
        secondaryBtnActiveColor: colors.white,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
