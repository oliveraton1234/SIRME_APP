/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./screens/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'inputs-login': "#EDEDED",
        'red-oro': "#B50404",
        'input-color': "#BDBDBD",
        'resume-color': "D9D9D9"
      },
    },
  },
  plugins: [],
};
