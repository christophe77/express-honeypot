const beeLanguage = require("./beeLanguage");
const { escapeHtml } = require("../../security/sanitize");

// Everything coming from the request or the remote payload is escaped.
// The injection is supposed to *look* like it worked, not actually work.
const htmlTemplate = (page, url, fileContent) => {
  const title = escapeHtml(page ? page.metas.title : url);
  const description = escapeHtml(page ? page.metas.description : url);
  const content = escapeHtml(page ? page.content : url);
  const remoteFileContent = escapeHtml(fileContent || "");
  return `
  <!DOCTYPE html>
  <html lang="bee">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="${description}">
        <meta name="title" content="${title}">
      </head>
      <body>
        <title>${title} : ${description}</title>
        <h1>${title}</h1>
        <h2>${description}</h2>
        <nav><a href="../">Home</a></nav>
        <h3>${content}</h3>
        <div style="padding:15px;">
          ${beeLanguage.generateBeeText()}
        </div>
        <h3>${content}</h3>
        <div style="padding:15px;">
          ${beeLanguage.generateBeeText()}
        </div>
        <pre style="padding:15px;white-space:pre-wrap;">${remoteFileContent}</pre>
      </body>
  </html>`;
};
module.exports = htmlTemplate;
