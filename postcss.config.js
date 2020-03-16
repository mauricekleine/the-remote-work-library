module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: process.env.NODE_ENV === "production" ? {} : false,
    "@fullhuman/postcss-purgecss":
      process.env.NODE_ENV === "production"
        ? {
            content: [
              "./(components|pages)/**/*.html",
              "./(components|pages)/**/*.js"
            ],

            // Include any special characters you're using in this regular expression
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          }
        : false
  }
};
