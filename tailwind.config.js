/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F6F3",
        ink: "#1A1A1A",
        muted: "#8A8A8A",
        line: "#E5E3DE",
        signal: "#1E3A8A",
        signalDark: "#152A63",
        rust: "#B4472C",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};