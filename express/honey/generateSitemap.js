const pages = require("./pages");
function generateSitemap() {
  const structureStart =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const structureEnd = "</urlset>";
  const urls = [];
  const dateMod = new Date();
  pages.map((page) =>
    urls.push(
      `<url><loc>${page.url}</loc><lastmod>${
        dateMod.toISOString().split("T")[0]
      }</lastmod></url>`
    )
  );
  return `${structureStart}${urls.join("\n")}${structureEnd}`;
}
module.exports = generateSitemap;
