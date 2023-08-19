const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require("dotenv-webpack");
const path = require('path')
const webpack = require('webpack');

const DEVELOPMENT = 'development'
const ENV = process.env.NODE_ENV || DEVELOPMENT
const IS_DEV = ENV === DEVELOPMENT

const HTML_LOADER = 'html-loader'
const STYLE_LOADER = 'style-loader'
const CSS_LOADER = 'css-loader'
const BABEL_LOADER = 'babel-loader'
const STRING_REPLACE_LOADER = 'string-replace-loader'
const FILE_LOADER = 'file-loader';

const SERVER_URL = /http:\/\/localhost:1234/g
const FRONTEND_PORT = 3000

const INDEX_HTML_PATH = './frontend/index.html'
const INDEX_JS_PATH = './frontend/index.js'
const DIST_FOLDER = 'dist'
const BUNDLE_FILE = 'index.js'

const SOURCE_MAP = IS_DEV ? 'source-map' : false

const config = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve("util/"),
      assert: require.resolve('assert'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve("buffer")
    }
  },
  entry: INDEX_JS_PATH,
  mode: ENV,
  output: {
    filename: BUNDLE_FILE,
    publicPath: '/',
    path: path.resolve(__dirname, DIST_FOLDER),
  },
  devtool: SOURCE_MAP,
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: INDEX_HTML_PATH,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser' 
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ],
  devServer: {
    static: path.join(__dirname, DIST_FOLDER),
    historyApiFallback: true,
    compress: true,
    port: FRONTEND_PORT,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: { loader: HTML_LOADER }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { 
          loader: BABEL_LOADER, 
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],

            plugins: ["@babel/plugin-transform-react-jsx"]
          }
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          STYLE_LOADER,
          CSS_LOADER,
        ],
      },
      {
        test: /\.png$/,
        type: 'asset/resource'
      }
    ],
  },
}

if (!IS_DEV) {
  config.module.rules.push({
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: STRING_REPLACE_LOADER,
      options: {
        search: SERVER_URL,
        replace: ''
      },
    },
  })
}

module.exports = config
