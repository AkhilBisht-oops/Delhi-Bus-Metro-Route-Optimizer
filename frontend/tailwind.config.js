import { plugin } from "postcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0078D4",
        secondary: "#005A9E",
        accent: "#FF6B35",
        metro: "#FF6B35",
        bus: "#00A859",
        delhi: "#FF9933",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugin: [],
};
