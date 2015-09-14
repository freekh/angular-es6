'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./frontend/app.js",
  output: {
      path: 'target',
      filename: "bundle.js"
  },
  module: {
    devtool: "sourcemap",
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint",
        exclude: /node_modules|bower_components/
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: "strict"
      },
      {
        test: /\.js$/,
        loader: "babel",
        exclude:  /node_modules|bower_components/
      },
      {
        test: /\.html$/,
        loader: "file",
        exclude:  /node_modules|bower_components/
      },
      {
        test: /[\/]angular\.js$/,
        loader: "exports?angular"
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './frontend/index.html',
        inject: 'body'
    })
  ]
}
