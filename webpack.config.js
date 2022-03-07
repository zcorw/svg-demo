const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js",
    vendors: ["@svgdotjs/svg.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(js)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [path.resolve(__dirname, "src")], // 检查src文件夹
        options: {
          formatter: require("eslint-friendly-formatter"), // 对代码提示友好化
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  watch: true,
};
