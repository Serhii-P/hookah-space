/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        alert: "#ed0532",
        midnight: "#101010",
        basicGreen: "#43b02a"
      },
      scale: {
        '105': '1.05',
      },
      keyframes: {
        pingOnce: {
          "50%": { transform: "scale(2)" },
          100: { transform: "scale(1)" },
        },
      },
      animation: {
        pingOnce: "pingOnce 0.5s cubic-bezier(0, 0, 0.2, 1) ",
      },
    },
    screens: {
      '3xl': {'max': '1535px'},
      '2xl': {'max': '1350px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '530px'},
    }
  },
  plugins: [],
}
