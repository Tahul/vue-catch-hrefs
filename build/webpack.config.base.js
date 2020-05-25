const webpack = require("webpack")
const { resolve } = require("path")

const { banner, filename, version } = require("./utils")

const plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(version),
    "process.env.NODE_ENV": '"test"',
  }),
  new webpack.BannerPlugin({ banner, raw: true, entryOnly: true }),
]

module.exports = {
  output: {
    path: resolve(__dirname, "../dist"),
    filename: `${filename}.common.js`,
  },
  entry: "./src/vue-catch-hrefs.js",
  resolve: {
    extensions: [".js"],
    alias: {
      src: resolve(__dirname, "../src"),
    },
  },
  plugins,
}
