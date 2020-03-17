const axios = require("axios");
const fs = require("fs");
const sharp = require("sharp");

const { getResourcesWithMetaData } = require("./fetch");

(async () => {
  const resources = await getResourcesWithMetaData();

  await Promise.all(
    resources.map(async ({ id, image }) => {
      const response = await axios({
        url: image,
        responseType: "arraybuffer"
      });

      sharp(response.data)
        .resize(480)
        .webp()
        .toFile(`public/cover-${id}.webp`);

      // fallback
      sharp(response.data)
        .resize(480)
        .png()
        .toFile(`public/cover-${id}.png`);
    })
  );
})();
