const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Bellefair', 'AllagiaDemo', ...defaultTheme.fontFamily.sans],
        serif: ['Bellefair','AllagiaDemo', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        grayWhite: '#dbdbdb',
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: {
          DEFAULT: colors.white,
          grayish: '#dbdbdb'
        },
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
      },
    },
  },
  variants: {
    extend: {
      fontSize: ['dark'],
      fontFamily: ['dark'],
      borderColor: ['dark'],
      textColor: ['dark']
    },
  },
  plugins: [],
}



// module.exports =
// {
//   purge: [],
//   theme: {
//     extend: {
//       fontFamily: {
//         custom: ['gilroyextrabold', 'sans-serif'],
//       },
//     },
//   },
//   variants: {},
//   plugins: [],
// }



// // tailwind.config.js
// module.exports = {
//   purge: [],
//   theme: {
//     fontFamily: {
//       custom: ['Inter', 'sans-serif'],
//     },
//   },
//   variants: {},
//   plugins: [],
// }



// // tailwind.config.js
// const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   purge: [],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   variants: {},
//   plugins: [],
// }