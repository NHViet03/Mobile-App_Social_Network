/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/css");
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/**/**/*.{js,jsx,ts,tsx}",
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff", 
      dark:{
        dark_80:'#000000cc',
        DEFAULT: "#000",
      },
      borderColor:'#d9d9d9',
      inputColor:'#eeeeee',
      textColor:'#737373',
      primary: {
        light: "#c433024d",
        DEFAULT: "#c43302",
        dark: "#b02d01",
      },
    },
  },
  plugins: [],
};
