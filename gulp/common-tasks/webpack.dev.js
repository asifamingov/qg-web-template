const config = require('../gulp-config');
module.exports = {
  output: {
    filename: 'qg-main.js',
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
  devtool: 'source-map',
  /*plugins: [
   new CopyWebpackPlugin([
   {from: `${config.basepath.src}/assets/_project/_blocks/qg-env.js`},
   ]),
   ],*/
};
