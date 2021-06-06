module.exports = {
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
    },
    future: {
        webpack5: true,
    },
    publicRuntimeConfig: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        APP_NAME: process.env.APP_NAME
    },
}
