require("dotenv").config();

module.exports = {
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_ENDPOINT_URL: process.env.AIRTABLE_ENDPOINT_URL
  },
  future: {
    webpack5: true
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./src/utils/download-company-logos");
      require("./src/utils/download-cover-images");
      require("./src/utils/generate-sitemap");
    }

    return config;
  }
};
