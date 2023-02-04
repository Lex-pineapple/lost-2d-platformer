const path = require('path');

const clientConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 8080,
    open: true,
    // hot: false,
    // liveReload: true,
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /./, to: '/index.html' }, // all requests to index.html
    //   ],
    // },
  },
};

module.exports.devClient = clientConfig;
