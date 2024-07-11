/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    //..
    visibility: ['responsive', 'group-hover', 'group-focus', 'hover', 'focus'],
  }
  
}
