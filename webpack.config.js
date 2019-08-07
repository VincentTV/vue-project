const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  mode: "production", // production，development
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html"
    }),
    new VueLoaderPlugin(),
    new CompressionPlugin({
      filename: "[path].gz[query]", //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: "gzip", //算法
      test: new RegExp(
        "\\.(js|css)$" //压缩 js 与 css
      ),
      threshold: 10240, //只处理比这个值大的资源。按字节计算
      minRatio: 0.8 //只有压缩率比这个值小的资源才会被处理
    })
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      { test: /\.(jpg|jepg|png|gif|svg)$/, use: "url-loader" },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: "url-loader" },
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.vue$/, use: "vue-loader" }
    ]
  }
};