const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const ManifestPluginFilter = (file) => {
  // only .js files
  return file.name && /\.js$/.test(file.name);
};

const ManifestPluginMap = (file) => {
  // remove .js ext
  if (file.name && /\.js$/.test(file.name)) {
    file.name = file.name.slice(0, -3);
  }

  return file;
};

const ManifestPluginOption = {
  writeToFileEmit: true,
  fileName: 'manifest.json',
  map: ManifestPluginMap,
  filter: ManifestPluginFilter,
};

/********************************************************************
 *        Client Config
 ********************************************************************/
const clientConfig = {
  entry: {
    login: path.resolve(__dirname, 'src', 'login'),
    main: path.resolve(__dirname, 'src', 'main'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name][ext]',
    clean: true,
    publicPath: '/',
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
        test: /\.(png|jpg|jpeg|gif|ogg|mp3|wav)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      { test: /\.svg$/, loader: 'svg-inline-loader' },
      {
        test: /\.(woff|woff2|eot|ttf|otf)/,
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
    new WebpackManifestPlugin(ManifestPluginOption),
    new HtmlWebpackPlugin({
      title: 'Lost 2D Platformer',
      template: path.resolve(__dirname, 'src', 'pages', 'index.html'),
      inject: true,
      chunks: ['login'],
      filename: 'index.html',
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Lost 2D Platformer',
    //   template: path.resolve(__dirname, 'src', 'pages', 'login.html'),
    //   inject: true,
    //   chunks: ['login'],
    //   filename: 'login.html',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Lost 2D Platformer',
    //   template: path.resolve(__dirname, 'src', 'pages', 'index.html'),
    //   inject: true,
    //   chunks: ['main'],
    //   filename: 'index.html',
    // }),
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
