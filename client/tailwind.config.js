/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081a51",
        "light-white": "rgba(255,255,255,0.17)"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  variants: {
    visibility: ['responsive', 'group-hover', 'group-focus', 'hover', 'focus'],
  }
}
