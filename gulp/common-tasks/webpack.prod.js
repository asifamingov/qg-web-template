const config = require('../gulp-config');
const path = require('path');
module.exports = {
  output: {
    filename: 'qg-main.js',
  },
  mode: 'production',
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    compress: true,
    port: 3000,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'webpack-replace',
          query: {
            search: '{{CDN}}',
            replace: process.env.NODE_ENV === 'prod' ? `https://static.qgov.net.au/assets/${config.versionName}` : `/assets/${config.versionName}`,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'webpack-replace',
        },
      },
    ],
  },
  /*plugins: [
   new CopyWebpackPlugin([
   {from: `${config.basepath.src}/assets/_project/_blocks/qg-env.js`},
   ]),
   ],*/
};
