const beeLanguage = require("./beeLanguage");

const htmlTemplate = (page, url, fileContent) => {
  const title = page ? page.metas.title : url;
  const description = page ? page.metas.description : url;
  const content = page ? page.content : url;
  const remoteFileContent = fileContent || "";
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
        <div style="padding:15px;">
          ${remoteFileContent}
        </div>
      </body>
  </html>`;
};
module.exports = htmlTemplate;
