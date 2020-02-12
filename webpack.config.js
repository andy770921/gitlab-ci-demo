const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js', gameEntry: './src/secondEntry.js'},  
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}, 
      { test: /\.css$/i, use: [{loader: "style-loader"}, {loader: "css-loader", options: {modules: false}}]}
    ]
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: "Todo's",
      template: './src/template.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'game.html',
      title: 'Game Page',
      template: './src/template.html',
      chunks: ['gameEntry']
    })
  ]
  
};