const beeLanguage = require("./beeLanguage");

const htmlTemplate = (page)=> {
  const { metas, content } = page;
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
  <html>
      <head>
        <meta name="description" content="${metas.description}">
        <meta name="title" content="${metas.title}">
      </head>
      <body>
        <h1>${metas.title}</h1>
        <h2>${metas.description}</h2>
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
