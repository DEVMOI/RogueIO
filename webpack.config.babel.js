import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
export default {
  entry: path.join(__dirname, "App.js"),
  output: {
    path: path.join(__dirname, "lib"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "pack",
      template: path.join(__dirname, "public/index.html"),
      nject: "body"
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    })
  ],
  stats: {
    colors: true
  },
  devtool: "source-map",
  mode: "development",
  devServer: {
    contentBase: "./lib",
    inline: true,
    port: 8085 //my prefered port for development, but change as you see fit
  }
};
