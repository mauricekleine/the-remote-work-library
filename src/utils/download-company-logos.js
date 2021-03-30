const axios = require("axios");
const sharp = require("sharp");

const { getCompaniesWithMetaData } = require("./fetch");

(async () => {
  const companies = await getCompaniesWithMetaData();

  await Promise.all(
    companies.map(async ({ id, logo }) => {
      const response = await axios({
        url: logo,
        responseType: "arraybuffer"
      });

      try {
        sharp(response.data)
          .resize(32)
          .webp()
          .toFile(`public/logo-${id}.webp`);

        // fallback
        sharp(response.data)
          .resize(32)
          .png()
          .toFile(`public/logo-${id}.png`);
      } catch (e) {
        console.log(e);
      }
    })
  );
})();
