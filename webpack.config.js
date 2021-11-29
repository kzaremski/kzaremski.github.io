// Packages
const path = require('path');

module.exports = {
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use: {
          loader:'babel-loader',
        },
      },
    ]
  },
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "[name].js"
  }
};