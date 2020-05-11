const path = require('path');

module.exports = {
  assetsRoot: path.resolve(__dirname, '../../dist'),
  assetsDirectory: 'static',
  publicPath: '/',
  indexPath: path.resolve(__dirname, '../public/index.html'),
  devServer: {
    port: 9952,
    host: GetLocalhost(),
    contentBase: path.join(__dirname, '../public'),
    watchContentBase: true,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'error',
    open: true,
    overlay: false,
    quiet: false,
    noInfo: false,
    watchOptions: {
      ignored: /node_modules/
    },
    proxy: {}
  }
};

function GetLocalhost() {
  const Interfaces = require('os').networkInterfaces();
  for (const Key in Interfaces) {
    const Iface = Interfaces[Key];
    for(const { family, address, internal } of Iface){
      if(family === 'IPv4' && address !== '127.0.0.1' && !internal){
        return address
      }
    }
  }
}