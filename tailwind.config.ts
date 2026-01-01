import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos: "#0B0E14",
        gold: {
          DEFAULT: "#D4AF37",
          100: "#F9F1D8",
          200: "#EFDEAA",
          500: "#D4AF37",
          600: "#B5952B",
          900: "#584610",
        },
        starlight: "#F5F5F7",
        amethyst: "#8E44AD",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
      },
      backgroundImage: {
        'mystic-radial': 'radial-gradient(circle at center, #2A1B3D 0%, #0B0E14 70%)',
      },
    },
  },
  plugins: [],
};
export default config;
