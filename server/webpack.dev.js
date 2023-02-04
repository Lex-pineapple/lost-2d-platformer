const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const serverConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins:[
    new NodemonPlugin({
      watch: path.resolve('dist'),
      ignore: ['*.js.map'],
      // nodeArgs: ['--inspect=9229'],
      restartable: 'rs',
      verbose: true,
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8082,
  },
};

module.exports.devServer = serverConfig;
