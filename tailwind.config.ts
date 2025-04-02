const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '10000': '10000ms',
      },
      transitionProperty: {
        'height': ['height'],
      },
      colors: {
        'ozo-green': '#0057B0',
        'ozo-purple': '#94358A',
        'ozo-orange': '#FFb06C',
        'ozo-dark-cyan': '#446660',
        'ozo-green-light': '#EBF5FF',
      },
      screens: {
        "xs": "395px",
      }
    },
  },
  plugins: [],
};

export default tailwindConfig;