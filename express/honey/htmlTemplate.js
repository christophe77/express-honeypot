const beeLanguage = require("./beeLanguage");

const htmlTemplate = (page, url) => {
  const title = page ? page.metas.title : url;
  const description = page ? page.metas.description : url;
  const content = page ? page.content : url;
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
  <html>
      <head>
        <meta name="description" content="${description}">
        <meta name="title" content="${title}">
      </head>
      <body>
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
      </body>
  </html>`;
};
module.exports = htmlTemplate;
