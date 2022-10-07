const path = require('path');
const assetsPath = '../../src';

const sharedConfig = {
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, `${assetsPath}/api`),
      '@components': path.resolve(__dirname, `${assetsPath}/components`),
      '@types': path.resolve(__dirname, `${assetsPath}/types`),
      '@services': path.resolve(__dirname, `${assetsPath}/services`),
    },
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  entry: {
    app: path.join(__dirname, assetsPath, 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, '../../static/js/'),
    filename: '[name].bundle.js',
  },
  plugins: [],
};

module.exports = sharedConfig;
