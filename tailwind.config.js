const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      green: colors.green,
      blue: '#1B72BF',
      black: colors.black,
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      primary: {
        50: '',
        100: '',
        200: '',
        300: '',
        400: '', //
        500: '#F2762E', //
        600: '#467B41',
        700: '',
        800: '',
        900: ''
      },
      secondary: '#1B72BF',
      violeta: {
        50: '#9859b2',
        100: '#8e4fa8',
        200: '#84459e',
        300: '#7a3b94',
        400: '#70318a',
        500: '#662780',
        600: '#5c1d76',
        700: '#52136c',
        800: '#480962',
        900: '#3e0058'
      },
      verde: {
        50: '#8cd370',
        100: '#82c966',
        200: '#78bf5c',
        300: '#6eb552',
        400: '#64ab48',
        500: '#5aa13e',
        600: '#509734',
        700: '#468d2a',
        800: '#3c8320',
        900: '#327916'
      },
      azul: {
        50: '#8d9bda',
        100: '#8391d0',
        200: '#7987c6',
        300: '#6f7dbc',
        400: '#6573b2',
        500: '#5b69a8',
        600: '#515f9e',
        700: '#475594',
        800: '#3d4b8a',
        900: '#334180'
      },
      naranja: {
        50: '#e89a47',
        100: '#de903d',
        200: '#d48633',
        300: '#ca7c29',
        400: '#c0721f',
        500: '#b66815',
        600: '#ac5e0b',
        700: '#a25401',
        800: '#984a00',
        900: '#8e4000'
      }
    },
    extend: {}
  },
  plugins: []
};
