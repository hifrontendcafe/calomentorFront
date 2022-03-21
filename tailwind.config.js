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
        sidebar: colors.zinc[800],
        topbar: colors.zinc[800],
        mainContent: colors.zinc[900],
        // Text Colors
        logoTextColor: colors.zinc[50],
        // Cards
        cardHeader: colors.zinc[800],
        cardContent: colors.zinc[800],
        cardContentLight: colors.zinc[800],
        // Others
        dividerColor: colors.teal[600],
        addTimeslot: '#215188',
        // Navigation colors
        hoverNavigation: colors.teal[800],
        hoverNavigationText: colors.zinc[50],
        activeNavigation: colors.teal[600],
        activeNavigationText: colors.zinc[50],
        // Primary Button colors
        mainBtnTxt: colors.zinc[50],
        mainBtnColor: colors.teal[600],
        mainBtnHoverColor: colors.teal[800],
        mainBtnActiveColor: colors.teal[600],
        // Secondary Button colors
        secondarynBtnTxt: '#010409',
        secondaryBtnColor: colors.zinc[50],
        secondaryBtnHoverColor: colors.teal[800],
        secondaryBtnActiveColor: colors.zinc[50],

        // Colors from website
        current: 'currentColor',
        coolGrayDark: '#050C1A',
        ellipseGreen: '#134547',
        profileRing: '#00C39D',
        greenFec: '#00C39D',
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
