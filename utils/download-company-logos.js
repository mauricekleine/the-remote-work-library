const axios = require("axios");
const sharp = require("sharp");

const {
  getCompaniesWithMetaData,
  getResourcesWithMetaData
} = require("./fetch");

const resizeCoverImage = sharp().resize(300);
const resizeLogo = sharp().resize(32);

const downloadImage = (url, image_path) =>
  axios({
    url,
    responseType: "stream"
  }).then(response => response.data.pipe(fs.createWriteStream(image_path)));

(async () => {
  const companies = await getCompaniesWithMetaData();
  const resources = await getResourcesWithMetaData();
})();
