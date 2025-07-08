import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshRspackPlugin from "@rspack/plugin-react-refresh";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/app/index.html",
    }),
    mode === "development" && new RefreshPlugin(),
  ].filter(Boolean),
  devtool: false, // "source-map",
  mode,
  entry: "src/app/index.tsx",
  resolve: {
    extensions: [".js", ".ts", ".tsx", "scss"],
    modules: ["node_modules", "src"].filter(Boolean),
    alias: {
      src: path.resolve("src"),
    },
    symlinks: false,
  },
};

export default config;
