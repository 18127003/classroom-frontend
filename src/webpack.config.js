const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = { 
    entry: path.resolve(__dirname, "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.bundle.js",
        clean: true,
    },
    resolve: {
        extensions: ['js', 'ts'],
        alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "public", "index.html"),
        }),
    ],
  }