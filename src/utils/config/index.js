import paths from './paths.json';
import locales from './locales.json';
const config = require(`./config.${process.env.REACT_APP_ENV || 'local'}.json`);

console.log(config);

export default {
    APP_NAME: "API",
    APP_VERSION: process.env.REACT_APP_VERSION,
    DEFAULT_LOCALE: "us",

    ...config,

    paths: {
        ...paths,
        ...config.paths
    },

    locales: {
        ...locales,
        ...config.locales
    }
};