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
        DEFAULT: "#c43302",
      },
      borderColor:'#d9d9d9',
      textColor:'#737373',
      primary: {
        light: "#c9471b",
        DEFAULT: "#c43302",
        dark: "#b02d01",
      },
    },
  },
  plugins: [],
};
