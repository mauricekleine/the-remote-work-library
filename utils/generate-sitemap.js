const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

(async () => {
  // Ignore Next.js specific files (e.g., _app.js)
  const pages = await globby(["pages/**/*{.js,.mdx}", "!pages/_*.js"]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map(page => {
                const path = page
                  .replace("pages", "")
                  .replace(".js", "")
                  .replace(".mdx", "");
                const route = path === "/index" ? "" : path;

                return `
                        <url>
                            <loc>${`https://theremoteworklibrary.com${route}`}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    parser: "html"
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
})();
