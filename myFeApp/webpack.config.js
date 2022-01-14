const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
 
  target: "web",
  mode: "development",
  
//   entry: "./src/components/index.tsx",
  entry: {
      app: "./src/components/index.tsx",
      style: "./src/styles/styles.scss"
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "build"),
    filename: '[name]'.js
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    //   {
    //     test: /\.css$/,
    //     loader: "css-loader",
    //   },
      {
        test: /\.scss$/,
        rules: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'} ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "components", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "./src/yourfile.css",
    }),
  ],
};
