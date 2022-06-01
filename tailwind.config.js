const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
        // Dashboard
        sidebar: '#171D24',
        topbar: '#171D24',
        mainContent: '#0F1318',
        // Text Colors
        mainTextColor: colors.teal[200],
        logoTextColor: colors.white,
        // Cards
        cardHeader: '#0F1218',
        cardContent: '#161B22',
        cardContentLight: '#0D1117',
        // Others
        fecGreen: '#00c39d',
        dividerColor: colors.teal[600],
        addTimeslot: '#215188',
        // Navigation colors
        hoverNavigation: colors.teal[800],
        hoverNavigationText: colors.white,
        activeNavigation: colors.teal[600],
        activeNavigationText: colors.white,
        // Primary Button colors
        mainBtnTxt: colors.white,
        mainBtnColor: colors.teal[600],
        mainBtnHoverColor: colors.teal[800],
        mainBtnActiveColor: colors.teal[600],
        // Secondary Button colors
        secondarynBtnTxt: '#010409',
        secondaryBtnColor: colors.white,
        secondaryBtnHoverColor: colors.teal[800],
        secondaryBtnActiveColor: colors.white,
      },
      // Colors from website
      textColor: {
        primary: colors.zinc[50],
        secondary: colors.zinc[200],
        tertiary: colors.zinc[300],
        quaternary: colors.zinc[400],
        accent: '#6366F1',
        informational: '#4991DA',
        lightBlue: '#00CCFF',
        darkBlue: '#0066CC',
        hover: '#2469FF',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
