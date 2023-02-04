const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/********************************************************************
 *        Client Config
 ********************************************************************/
const clientConfig = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name][ext]',
    clean: true,
  },
  target: 'web',
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: './src/components/views',
        //   to: path.resolve(__dirname, './dist/components/views'),
        // },
        // {
        //   from: './src/data',
        //   to: path.resolve(__dirname, './dist/data'),
        // },
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, 'dist', 'assets'),
        },
      ],
    }),
  ],
};

/********************************************************************
 *        Exports
 ********************************************************************/
module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';

  if (isProductionMode) {
    const envConfig = require('./webpack.prod');
    return merge(clientConfig, envConfig.prodClient);
  } else {
    const envConfig = require('./webpack.dev');
    return merge(clientConfig, envConfig.devClient);
  }
};
