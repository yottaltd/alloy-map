const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  //devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'alloy-map.js',
    library: 'alloymap',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
};
