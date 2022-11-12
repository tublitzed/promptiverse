const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.zinc,
      green: {
        50: '#E9FFF9',
        100: '#D1F5EC',
        200: '#ADE1D3',
        300: '#87C8B6',
        400: '#76B2A2',
        500: '#5B9686',
        600: '#4F8073',
        700: '#426A60',
        800: '#34534B',
        900: '#273D37',
      },
      red: {
        50: '#FFEEEE',
        100: '#FFD8D8',
        200: '#FAB2B2',
        300: '#F08B8B',
        400: '#DF6C6C',
        500: '#BF3D3D',
        600: '#9F3636',
        700: '#7D2A2A',
        800: '#6A2424',
        900: '#7D2A2A',
      },
    },
    extend: {
      animation: {
        loader: 'loader 2s ease infinite',
      },
      keyframes: {
        loader: {
          '0%': {
            left: '0',
            right: '100%',
          },
          '50%': {
            left: '0',
            right: '0',
          },
          '100%': {
            left: '100%',
            right: '0',
          },
        },
      },
    },
  },
  // theme: {
  //   // colors: {
  //   //   transparent: 'transparent',
  //   //   current: 'currentColor',
  //   //   black: colors.black,
  //   //   white: colors.white,
  //   //   gray: colors.gray,
  //   //   emerald: colors.emerald,
  //   //   indigo: colors.indigo,
  //   //   yellow: colors.yellow,
  //   //   // blue: {
  //   //   //   100: '#0D31B0'
  //   //   // }
  //   // },
  // },
  plugins: [],
}
