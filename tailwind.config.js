/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Helvetica", "Montserrat", "Open Sans", "sans-serif"],
    },
    extend: {
      animation: {
        text: "text 5s ease infinite",
      },
      backgroundColor: {
        black: "#000",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "100% 100%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
