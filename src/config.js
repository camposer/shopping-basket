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
  apiPort: process.env.APIPORT,
  app: {
    title: 'Shopping Basket',
    description: 'Another shopping basket example.',
    head: {
      titleTemplate: 'Shopping Basket: %s',
      meta: [
        {name: 'description', content: 'Another shopping basket example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Shopping Basket'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Shopping Basket'},
        {property: 'og:description', content: 'Another shopping basket example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@camposer'},
        {property: 'og:creator', content: '@camposer'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
