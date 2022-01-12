/**
 * @name publish
 * @author Lester
 * @date 2022-01-05 15:57
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin'); // 简单打包进度百分比
const TerserPlugin = require('terser-webpack-plugin'); // js

const ROOT_PATH = path.resolve(__dirname, '../');

module.exports = {
  target: 'es2020',
  entry: {
    main: path.resolve(ROOT_PATH, './src/tools/index.ts')
  },
  output: {
    path: path.resolve(ROOT_PATH, './lib'),
    filename: 'index.js',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  },
  mode: 'production',
  module: {
    rules: [
      // ts-loader 用于加载解析 ts 文件
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(ROOT_PATH, './src')
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.less', '.css']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new SimpleProgressWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      extractComments: false,
      terserOptions: {
        output: {
          comments: false,
          ascii_only: true
        },
        compress: {
          drop_console: false,
          drop_debugger: true,
          comparisons: false
        },
        safari10: true
      }
    })]
  }
};
