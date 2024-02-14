const { defaultLivenessDisplayText } = require("./english.js");
const { japaneseLivenessDisplayText } = require("./japanese.js");
const { spanishLivenessDisplayText } = require("./spanish.js");

export const dictionary = {
    en: defaultLivenessDisplayText,
    ja: japaneseLivenessDisplayText,
    es: spanishLivenessDisplayText,
}
