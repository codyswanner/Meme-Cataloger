const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      }, // Add a comma after this closing brace

      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: {
            loader: 'css-loader'
        }
      }
    ], // Add this closing square bracket
  },
  optimization: {
    minimize: true,
  },
};
