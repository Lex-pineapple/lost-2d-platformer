const path = require('path');
const { merge } = require('webpack-merge');
const NodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

/********************************************************************
 *        Server Config
 ********************************************************************/
const serverConfig = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    // filename: '[name].[contenthash].js',
    // assetModuleFilename: '[name][ext]',
    clean: true,
  },
  externals: [ NodeExternals() ],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})]
  }
};

/********************************************************************
 *        Exports
 ********************************************************************/
module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';

  if (isProductionMode) {
    const envConfig = require('./webpack.prod');
    return merge(serverConfig, envConfig.prodServer);
  } else {
    const envConfig = require('./webpack.dev');
    return merge(serverConfig, envConfig.devServer);
  }
};
