// const colors = require('tailwindcss/colors')
// console.log(colors);
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
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
