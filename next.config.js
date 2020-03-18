require("dotenv").config();

module.exports = {
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_ENDPOINT_URL: process.env.AIRTABLE_ENDPOINT_URL
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./utils/download-company-logos");
      require("./utils/download-cover-images");
      require("./utils/generate-sitemap");
    }

    return config;
  }
};
