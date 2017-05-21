require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 80,
  apiPath: process.env.APIPATH || '/api',
  uploadsHost: process.env.UPLOADSHOST || 'localhost',
  uploadsPort: process.env.UPLOADSPRORT || '3030',
  app: {
    title: 'DonateGold.Me',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'DonateGold.Me: %s',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'DonateGold.Me'},
        {property: 'og:image', content: 'DonateGold.Me/logo.jpg'},
        {property: 'og:locale', content: 'ru_RU'},
        {property: 'og:title', content: 'DonateGold.Me'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
