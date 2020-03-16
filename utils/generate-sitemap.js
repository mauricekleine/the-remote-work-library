const fs = require("fs");
const prettier = require("prettier");

const { getCompanies, getResources } = require("./fetch");

(async () => {
  const companies = await getCompanies();
  const resources = await getResources();

  const companiesRoutes = companies.map(
    ({ name }) => `resources/${name.toLowerCase().replace(/ /g, "")}`
  );

  const tagsRoutes = [
    ...new Set(resources.map(({ type }) => `tags/${type.toLowerCase()}`))
  ];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://theremoteworklibrary.com</loc>
      </url>

      ${[...companiesRoutes, ...tagsRoutes]
        .map(
          route => `
            <url>
              <loc>${`https://theremoteworklibrary.com/${route}`}</loc>
            </url>
          `
        )
        .join("")}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    parser: "html"
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
})();
