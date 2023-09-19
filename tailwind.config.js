/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      mono: ["Space Mono", "monospace"],
    },
    extend: {
      textColor: {
        "primary-light": "#0c0a09",
        "primary-dark": "#fafaf9",
        "secondary-light": "#44403c",
        "secondary-dark": "#d6d3d1",
      },
      borderColor: {
        "primary-light": "#a8a29e",
        "primary-dark": "#44403c",
      },
      backgroundColor: {
        "primary-light": "#fafaf9",
        "primary-dark": "#292524",
        "secondary-light": "#cfd0d1",
        "secondary-dark": "#1c1917",
      },
    },
  },
  plugins: [],
};
