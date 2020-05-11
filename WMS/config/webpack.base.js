const path = require('path');
const config = require('./config');
const APP_PATH = path.resolve(__dirname, '../src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const argv = require('yargs').argv;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const bundleAnalyzerReport = argv.report; // 根据命令参数是否含有 'report' 来决定是否生成报告
// 这个配置将合并到最后的配置中
const webpackConfig = {
  plugins: []
};
if (bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: path.join(config.assetsRoot, './report.html')
  }));
}

const Theme = require(`${APP_PATH}/utils/theme/Standard.json`)

module.exports = merge(webpackConfig, {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.publicPath
  },
  module: {
    rules: [
      {
        oneOf: [
          /* eslint配置 */
          // {
          //   enforce: 'pre',
          //   test: /\.tsx?$/,
          //   exclude: /node_modules/,
          //   include: [APP_PATH],
          //   loader: 'eslint-loader',
          //   options: {
          //     emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
          //     emitError: true, // 这个配置需要打开，才能在控制台输出error信息
          //     fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
          //   }
          // },
          {
            test: /\.(html)$/,
            loader: 'html-loader'
          },
          {
            test: /\.(j|t)sx?$/,
            include: APP_PATH,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-react',  // jsx支持
                    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
                  ],
                  plugins: [
                    '@babel/plugin-syntax-dynamic-import', // 这是新加入的项
                    ['@babel/plugin-proposal-class-properties', { 'loose': true }] // class中的箭头函数中的this指向组件
                  ],
                  cacheDirectory: true // 加快编译速度
                }
              },
              {
                loader: 'awesome-typescript-loader'
              }
            ]
          },
          {
            test: /\.(less|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: false
                }
              },
              'postcss-loader', // 注意插入的位置，webpack.prod.js也要加这一项！！！
              {
                loader: 'less-loader',
                options: { 
                  javascriptEnabled: true,
                  modifyVars: Theme
                }
              }
            ]
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack']
          },
          {
            test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024, // 小于这个大小的图片，会自动base64编码后插入到代码中
              name: 'img/[name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          },
          // 下面这个配置必须放在最后
          {
            exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'media/[path][name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
     '@': path.resolve(__dirname, '../src/') // 以 @ 表示src目录
    }
   },
  plugins:[
    new HtmlWebpackPlugin({
      inject: true,
      template: config.indexPath,
      showErrors: true
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
    {
      from: 'public',
      ignore: ['index.html']
    }
  ])
  ],
  optimization: {}
});