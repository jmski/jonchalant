/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Zen Palette
        "ink-black": "#0f0e0c",
        "ink-dark": "#1a1915",
        "bone-cream": "#faf9f6",
        sand: "#e8e3d8",
        ash: "#8a8a8a",
        "burnt-indigo": "#6b8e63" /* Changed to green */,
        "indigo-light": "#8aa87a" /* Green light variant */,
        "muted-moss": "#5a8a6a" /* Changed to moss success */,
        "moss-light": "#8aa87a",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["Monaco", "Courier New", "monospace"],
      },
      spacing: {
        "section-mobile": "6rem 1.5rem",
        "section-tablet": "8rem 2.5rem",
        "section-desktop": "10rem 3rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        subtle: "200ms",
        base: "300ms",
        slow: "500ms",
      },
    },
  },
  plugins: [],
};
