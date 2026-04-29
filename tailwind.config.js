/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        kora: {
          black: "#080807",
          gold: "#C9982A",
          cream: "#F0EAD6",
          muted: "#6B6453",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(201, 152, 42, 0.2)",
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(circle at top, rgba(201, 152, 42, 0.2), transparent 45%)",
      },
    },
  },
  plugins: [],
};
