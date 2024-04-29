/**
 * tailwind config file
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#111111',
      blue: '#88B3E8',
      purple: '#C1AFE8',
      orange: '#FEBF88',
      peach: '#FFF5EE',
      white: '#FFFFFF',
      red: '#ED5151',
      green: '#36C07E',
      gray: '#686868',
      lightgray: '#CFCFCF',
      chatgray: '#EAEBEE',
      darkgray: '#3E3E3E',
      pastelred: '#F7778C',
      pastelgreen: '#ABD7B9',
      pastelpeach: '#FFC7C7',
    },
    fontFamily: {
      diary: ['The Day Diary'],
    },
    extend: {},
  },
  plugins: [],
};
