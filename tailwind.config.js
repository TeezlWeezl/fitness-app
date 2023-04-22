module.exports = {
  content: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-dark": "#202430",
        "app-medium": "#3A4151",
        "app-light": "#FBFBFB",
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
    },
  },
  plugins: [],
};
