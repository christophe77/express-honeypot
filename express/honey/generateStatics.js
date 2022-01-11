const pages = require("./pages");
const config = require("../config");

function sitemapXml() {
  const urls = [];
  const dateMod = new Date();
  pages.map((page) =>
    urls.push(
      `<url>
        <loc><![CDATA[${config.HOST}${page.url}]]></loc>
        <lastmod>${dateMod.toISOString().split("T")[0]}</lastmod>
      </url>`
    )
  );
  const structure = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join("\n")}
      </urlset>
      `;
  return structure;
}
function indexHtml() {
  const urls = ['<li><a href="sitemap.xml">sitemap</a></li>'];
  pages.map((page) =>
    urls.push(`<li><a href="${page.url}">${page.metas.title}</a></li>`)
  );
  const structure = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
        <head>
          <title>Beeeeee 🐝</title>
          <meta name="google-site-verification" content="${
            config.GOOGLE_VERIFICATION
          }" />
        </head>
        <body>
        <h1>tchhhhh !</h1>
        <p>Welcome to express honeypot, the best place to learn the bee language.</p>
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
