const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: {
    primary: './js/custom.js',
    gmtTag:'./js/gmtTag.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js', // Add this line
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv(),
  ],
};
