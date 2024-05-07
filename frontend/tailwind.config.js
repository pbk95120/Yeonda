/**
 * tailwind config file
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    maxHeight: {
      content: 'calc(100vh - 10rem)',
    },
    screens: {
      sm: '375px',
    },
    colors: {
      black: '#111111',
      blue: { DEFAULT: '#88B3E8', hover: '#77A5DE' },
      purple: '#C1AFE8',
      orange: { DEFAULT: '#FEBF88', hover: '#F2AF74' },
      peach: '#FFF5EE',
      white: '#FFFFFF',
      red: '#ED5151',
      green: '#36C07E',
      gray: '#686868CC',
      lightgray: { DEFAULT: '#CFCFCF', hover: '#C8BFBF' },
      chatgray: '#EAEBEE',
      darkgray: { DEFAULT: '#3E3E3E', hover: '#383535' },
      pastelred: { DEFAULT: '#F7778C', hover: '#EE677D' },
      pastelgreen: '#ABD7B9',
      pastelpeach: { DEFAULT: '#FFC7C7', hover: '#FFB2B2' },
    },

    fontFamily: {
      diary: [
        'The Day Diary',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      sans: [
        'Noto Sans KR',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
    extend: {},
  },
  plugins: [],
};
