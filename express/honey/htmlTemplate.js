const htmlTemplate = (page) => {
  const {metas, content} = page;
  return (
    `<html><head><meta name="description" content="${metas.description}">` +
    `<meta name="title" content="${metas.title}"></head>` +
    `<body>${content}</body>`
  );
};
module.exports = htmlTemplate;
