const beeLanguage = require("../honey/display/beeLanguage");
const { escapeHtml } = require("../security/sanitize");

function sitemapXml(traps, baseUrl) {
  const lastmod = new Date().toISOString().split("T")[0];
  const urls = traps.map(
    (trap) => `<url>
        <loc><![CDATA[${baseUrl}${trap.url}]]></loc>
        <lastmod>${lastmod}</lastmod>
      </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join("\n")}
      </urlset>
      `;
}

function indexHtml({ traps, googleVerification, beekeeperPath }) {
  const urls = ['<li><a href="sitemap.xml">sitemap</a></li>'];
  traps.forEach((trap) =>
    urls.push(
      `<li><a href="${escapeHtml(trap.url)}">${escapeHtml(
        trap.metas.title
      )}</a></li>`
    )
  );
  const verification = googleVerification
    ? `<meta name="google-site-verification" content="${escapeHtml(
        googleVerification
      )}" />`
    : "";
  const beekeeperLink = beekeeperPath
    ? `<p><a href="${escapeHtml(beekeeperPath)}">Beekeper Access</a></p>`
    : "";
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
        <head>
          <title>Beeeeee 🐝</title>
          ${verification}
        </head>
        <body>
        <h1>Bzzzzzzzz!</h1>
        <p>Welcome to bee learning, the best place to learn the bee language.</p>
        ${beekeeperLink}
        <img src="./beekeeper.jpg" alt="beekeeper" />
        <p>
        ${beeLanguage.generateBeeText()}
        </p>
        <ul>
          ${urls.join("\n")}
        </ul>
      </body>
    </html>`;
}

module.exports = { sitemapXml, indexHtml };
