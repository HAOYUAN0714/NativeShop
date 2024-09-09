module.exports = {
    parsers: {
        typescript: {
            ...require('prettier/parser-typescript').parsers.typescript,
            preprocess(text) {
                return text.replace(/(\?.*?:)/g, (match) => `\n${match.trim()}\n`);
            },
        },
    },
};
