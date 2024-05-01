/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: "class",
  theme: {
    container:{
      center: true,
      padding: '2rem',
      screens: {
        "2xl": '1400px',
      },
    },
    screens: {
      'sm': '320px',
      // => @media (min-width: 320)px { ... }
      
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... } 
      
      '3xl': '2106px',

      'navbar': '1280px',
      // => @media (min-width: 1536px) { ... }  
    },
    extend: {},
  },
  plugins: [],
  
}