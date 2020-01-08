/* eslint-disable */
const yargs = require('yargs');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getParameters() {
  const a = yargs.usage('Usage: $0 <command> --api_root=<api_root>')
  a.demandOption('api_root')
    .describe('api_root', 'URL of the API Server')

  return a.epilog('Renji Joseph Sabu. Copyright ' + (new Date).getFullYear())
    .help()
    .argv;
}

var argv = getParameters();

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: "production",
  target: 'web',
  entry: path.resolve(srcPath, 'js', 'index.jsx'),
  output: {
    path: distPath,
    filename: 'js/[name].[contenthash].js',
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.jsx', '.json']
  },
  module: {
    rules: [{
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "media/[name].[ext]",
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: "fonts/[name].[ext]",
        }
      },
      {
        test: /\.(txt|pem)$/,
        loader: 'raw-loader',
        options: {
          name: "[name].[ext]",
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: () => {
                return [
                  require('autoprefixer')({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                    flexbox: 'no-2009',
                  })
                ];
              },
            },
          },
          {
            loader: 'sass-loader'
          },
        ]
      },
      {
        test: /\.module\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
              localIdentName: '[local]__[hash:base64:5]',
              minimize: true,
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => {
                return [
                  require('autoprefixer')({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                    flexbox: 'no-2009',
                  })
                ];
              },
            },
          },
          {
            loader: 'sass-loader'
          },
        ]
      },
      {
        test: /config\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: '**APIROOT**',
          replace: argv.api_root,
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new CopyWebpackPlugin([{
      from: './src/assets/media',
      to: './media',
      force: true
    }, ]),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css"
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${srcPath}/index.html.template`,
      title: 'Pokemon Unvalled',
    }),
  ]
};
