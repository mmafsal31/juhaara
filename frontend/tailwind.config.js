/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pearl: "#F7F3EE",
        ivory: "#FFFCF7",
        emerald: "#0D3B2A",
        gold: "#D6B36A",
        ink: "#1B1B1B",
        mist: "#E6DED3"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 24px 70px rgba(13, 59, 42, 0.13)",
        glow: "0 20px 42px rgba(214, 179, 106, 0.24)"
      },
      borderRadius: {
        luxury: "24px"
      }
    }
  },
  plugins: []
};

