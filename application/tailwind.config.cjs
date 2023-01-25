/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        strong_cyan: "hsl(172, 67%, 45%)",
        dark_cyan: "hsl(183, 100%, 15%)",
        grayish_cyan: "hsl(184, 14%, 56%)",
        light_grayish_cyan: "hsl(185, 41%, 84%)",
        very_light_grayish_cyan: "hsl(189, 41%, 97%)",
      },
      fontFamily: {
        space_mono: "Space Mono",
      },
    },
  },
  plugins: [],
};
