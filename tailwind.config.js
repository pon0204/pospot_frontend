module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,

  theme: {
      extend: {
        backgroundImage: theme => ({
          'hero-img' : "url('./image/heroHeader.jpg')",
          'hero-responsive-img' : "url('./image/heroHeaderResponsive.jpg')",
        })
      }
  },
  variants: {
      extend: {},
  },
  plugins: [],
}