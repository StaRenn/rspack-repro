import path from "path";
import { fileURLToPath } from "url";
import rspack from "@rspack/core";
import * as sass from "sass";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshRspackPlugin from "@rspack/plugin-react-refresh";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

const swc = isRunningWebpack ? "swc-loader" : "builtin:swc-loader";

const mode = process.env.NODE_ENV || "development";

const RefreshPlugin = isRunningWebpack
  ? ReactRefreshWebpackPlugin
  : ReactRefreshRspackPlugin;

const extractCssLoader = isRunningWebpack
  ? "mini-css-extract-plugin"
  : rspack.CssExtractRspackPlugin.loader;

const ExtractCssPlugin = isRunningWebpack
  ? MiniCssExtractPlugin
  : rspack.CssExtractRspackPlugin;

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  target: "web",
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?|cjs)$/,
        use: [
          {
            loader: swc,
            options: {
              module: {
                type: "es6",
                ignoreDynamic: true,
                noInterop: false,
              },
              isModule: "unknown",
              jsc: {
                externalHelpers: true,
                parser: {
                  syntax: "typescript",
                  tsx: true,
                  decorators: true,
                  dynamicImport: true,
                },
                transform: {
                  legacyDecorator: true,
                  react: {
                    runtime: "automatic",
                    development: mode === "development",
                    refresh: mode === "development",
                  },
                },
              },
              env: {
                targets: ["> 0.25%", "not dead", "not ie 11", "safari >= 14"],
              },
            },
          },
        ],
      },
      {
        test: /\.(scss|scss)$/,
        include: [path.resolve(__dirname, "src")],
        use: [
          mode === "development" ? "style-loader" : extractCssLoader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
              implementation: "sass-embedded",
              sassOptions: {
                sourceMapIncludeSources: true,
                logger: sass.Logger.silent,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/app/index.html",
    }),
    new ExtractCssPlugin({
      filename:
        mode === "development" ? "[name].css" : "[name].[contenthash].css",
    }),
    mode === "development" && new RefreshPlugin(),
  ].filter(Boolean),
  devtool: false, // "source-map",
  mode,
  entry: "src/app/index.tsx",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".scss"],
    modules: ["node_modules", "src"].filter(Boolean),
    alias: {
      src: path.resolve("src"),
    },
    symlinks: false,
  },
};

export default config;
