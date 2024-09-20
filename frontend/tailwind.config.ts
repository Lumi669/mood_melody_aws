import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        jersey: ['"Jersey 20 Charted"'], // fallback to sans-serif
      },
      colors: {
        "light-red": "#fdba74", // Customize light orange
        "light-blue": "#93c5fd", // Customize light blue
        beige: {
          100: "#faf4e1", // Light Beige
          200: "#f5e6c8", // Medium Beige
          300: "#edd1a3", // Darker Beige
        },
        pastel: {
          100: "#f7e6f8", // Light Pastel Pink
          200: "#e6d8f7", // Light Pastel Purple
          300: "#d8e6f7", // Light Pastel Blue
        },
      },
      keyframes: {
        "fly-in": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "fly-in": "fly-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
  safelist: ["bg-light-red", "bg-light-blue"],
};
export default config;
