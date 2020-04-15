const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer")
];

/* Copy images and create a folder */
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", () => {
      fse.copySync("./app/assets/images", "./docs/assets/images");
    });
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
    "css-loader?url=false",
    {
      loader: "postcss-loader",
      options: {
        plugins: postCSSPlugins
      }
    }
  ]
};

/* Look for files with ".html" */
let pages = fse
  .readdirSync("./app")
  .filter(file => {
    return file.endsWith(".html");
  })
  .map(page => {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`
    });
  });

/* Shared configuration */
let config = {
  entry: "./app/assets/scripts/App.js",
  plugins: pages,
  module: {
    rules: [
      cssConfig,
      {
        test: /\.js$/,
        exclude: /(mode_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  }
};

/* Development */
if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader");
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  };
  config.devServer = {
    before: (app, server) => {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0"
  };
  config.mode = "development";
}

/* Build */
if (currentTask == "build") {
  // ensure that JS supports older browsers as well - using babel

  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  postCSSPlugins.push(require("cssnano"));
  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "docs")
  };
  config.mode = "production";
  config.optimization = {
    splitChunks: {
      chunks: "all"
    }
  };
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }),
    new RunAfterCompile()
  );
}

module.exports = config;
