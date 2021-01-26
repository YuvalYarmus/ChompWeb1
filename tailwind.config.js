const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
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
      fontFamily : ['dark'],
      borderColor : ['dark'], 
      textColor : ['dark']
    },
  },
  plugins: [],
}
