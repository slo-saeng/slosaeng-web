/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-point': '#FCBA69',
        'main-base': '#FFF5E8',
        'main-point-dark': '#FF9A1E',
      },
    },
  },
  plugins: [require('daisyui')],
};
