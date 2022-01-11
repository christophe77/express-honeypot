const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require("google-img-scrap");
const alphabee = [
  "zaa",
  "bee",
  "cee",
  "dee",
  "zee",
  "fee",
  "gee",
  "hee",
  "zii",
  "jee",
  "kee",
  "lee",
  "mee",
  "nee",
  "zoo",
  "pee",
  "qee",
  "ree",
  "see",
  "tee",
  "zuu",
  "vee",
  "wee",
  "xee",
  "yee",
  "zee",
];
function createWord(length) {
  let word = "";
  for (let i = 0; i < length; i++) {
    word += alphabee[Math.floor(Math.random() * alphabee.length)];
  }
  return word;
}
function createSentence(length) {
  let words = "";
  for (let i = 0; i < length; i++) {
    if (i === 0) {
      let word = `${createWord(Math.floor(Math.random() * 5))} `;
      words += word.charAt(0).toUpperCase() + word.slice(1);
    } else if (i === length - 1) {
      words += `${createWord(Math.floor(Math.random() * 5))}.`;
    } else {
      words += `${createWord(Math.floor(Math.random() * 5))} `;
    }
  }
  return words;
}
function createParagraph(length) {
  let paragraph = "";
  for (let i = 0; i < Math.floor(Math.random() * 25); i++) {
    paragraph += `${createSentence(Math.floor(Math.random() * 25))}<br />`;
  }
  return paragraph;
}
function generateBeeText() {
  let text = "";
  for (let i = 0; i < Math.floor(Math.random() * 25); i++) {
    text += `<p>${createParagraph(Math.floor(Math.random() * 25))}</p>`;
  }
  return text;
}

const beeLanguage = {
  generateBeeText,
};
module.exports = beeLanguage;
