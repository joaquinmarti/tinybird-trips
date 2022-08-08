const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    init: "./src/init/chart",
    lib: "./src/lib",
    chart: "./src/widgets/chart"
  },
  output: {
    filename: "[name]-[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["raw-loader"],
      },
    ]
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["init", "chart"],
      template: "./support/webpack.index.template.html",
      title: "Tinybird Dashboard",
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: "snippet.html",
      chunks: ["init", "chart"],
      template: "./support/webpack.snippet.template.html",
      title: "Tinybird Dashboard with snippet",
      inject: false
    })
],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};