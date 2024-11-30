/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto : ['Roboto','sans'],
        Cinzel : ['Cinzel', 'sans']
      },

      screens: {
        xs: '340px',
        sm: '460px',
        md: '700px',
        lg: '980px',
      }
    },
  },
  plugins: [],
}