/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins", "serif"], // Add the Poppins font
      },
      colors: {
        "app-black": "#151515", // Replace with your desired hex color code
        "app-red-500": "#E81E1E", // Replace with your desired hex color code
        "app-highlight-color": "#9E9E9E", // Replace with your desired hex color
      },
    },
  },
  plugins: [],
};
