const beeLanguage = require("./beeLanguage");

const htmlTemplate = (page) => {
  const { metas, content } = page;
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
  <html>
      <head>
        <meta name="description" content="${metas.description}">
        <meta name="title" content="${metas.title}">
      </head>
      <body>
        <p>${content}</p>
        <p>${beeLanguage.generateBeeText(10)}</p>
      </body>
  </html>`;
};
module.exports = htmlTemplate;
