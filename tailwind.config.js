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
        sidebar: "#161B22",
        topbar: "#161B22",
        mainContent: "#0D1117",
        cardHeader: "#161B22",
        cardContent: "#161B22",
        fecGreen: "#00c39d",
        mainTextColor: colors.teal[200],
        logoTextColor: colors.white,
        dividerColor: colors.teal[600],
        // Navigation colors
        hoverNavigation: colors.teal[600],
        hoverNavigationText: colors.white,
        activeNavigation: colors.teal[800],
        activeNavigationText: colors.white,
        // Button colors
        mainBtnColor: colors.teal[800],
        mainBtnHoverColor: colors.teal[600],
        mainBtnActiveColor: colors.teal[800],
        secondaryBtnColor: colors.white,
        secondaryBtnHoverColor: colors.teal[600],
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
