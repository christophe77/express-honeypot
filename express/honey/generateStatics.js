const pages = require("./pages");
const config = require("../config");

function sitemapXml() {
  const structureStart =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const structureEnd = "</urlset>";
  const urls = [];
  const dateMod = new Date();
  pages.map((page) =>
    urls.push(
      `<url>
        <loc>${config.HOST}${page.url}</loc>
        <lastmod>${dateMod.toISOString().split("T")[0]}</lastmod>
      </url>`
    )
  );
  return `${structureStart}${urls.join("\n")}${structureEnd}`;
}
function indexHtml() {
  const urls = [];
  pages.map((page) =>
    urls.push(`<li><a href="${page.url}">${page.metas.title}</a></li>`)
  );
  const structure = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
        <head>
          <title>Beeeeee 🐝</title>
        </head>
        <body>
        <h1>Sitemap</h1>
        <ul>
          ${urls.join("\n")}
        </ul>
      </body>
    </html>`;
  return structure;
}
const generateStatics = {
  sitemapXml,
  indexHtml,
};
module.exports = generateStatics;
