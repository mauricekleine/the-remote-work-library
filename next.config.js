require("dotenv").config();

module.exports = {
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_ENDPOINT_URL: process.env.AIRTABLE_ENDPOINT_URL
  }
};
