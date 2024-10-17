import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      primary: ['Orbitron', 'sans-serif'],
      secondary: ['Rajdhani', 'sans-serif'],
      tertiary: ['Aldrich', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '20px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#00B8B9',
        secondary: '#413E53',
      },
      backgroundImage: {
        dark: "url('/images/dark.jpg')",
        light: "url('/images/light.jpg')",
        plain: "url('/images/plain_l.jpg')",
        back: "url('/images/back.png')",
      },
    },
  },
  plugins: [],
};
export default config;
