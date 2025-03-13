// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        custom_neutral: {
          0: "#FFFFFF",
          100: "#F2F2F7",
          200: "#E4E4EF",
          600: "#404254",
          700: "#2A2B37",
          800: "#21222C",
          900: "#12131A",
        },
        // Otros colores
        Purple: {
          400:"#D3A0FA",
          500:"#C27CF8",
        },
        custom_yellow: "#FF9F00",
        custom__orage:{
          500:"#FE8159",
          800:"#DA3701",
        },
      },
      backgroundImage: {
        'gradient-hsl': 'linear-gradient(to right, hsl(7, 86%, 67%), hsl(0, 0%, 100%))',
      },
      fontFamily: {
        dmsans: ['DMSans-Regular', 'sans-serif'],
      },
      spacing: {
        '025': '2px', 
        '050': '4px',
        '075': '6px',
        '100': '8px',
        '150': '12px',
        '200': '16px',
        '250': '20px',
        '300': '24px',
        '400': '32px',
        '500': '40px',
        '600': '48px',
        '800': '64px',
        '1000': '8 0px',
      },
      borderRadius: {
        '10': '10px', 
        '20': '20px',
      },
      fontSize: {
        '2.5xl': '2.5rem', 
      },
    },
  },
  plugins: [],
};
