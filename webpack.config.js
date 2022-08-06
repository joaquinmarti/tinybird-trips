const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    widgetsLoader: "./src/loader",
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
  plugins: [new HtmlWebpackPlugin({
    chunks: ["widgetsLoader", "chart"],
    template: "./support/webpack.template.html",
    title: "Tinybird Widgets Test",
    inject: false
  })],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};