const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  devtool: slsw.lib.webpack.isLocal ? 'eval-cheap-module-source-map' : 'source-map',
  entry: slsw.lib.entries,
  target: "node",
  resolve: {
    extensions: ['.cjs', '.mjs', '.js', '.ts'],
  },
  optimization: {
    concatenateModules: false
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: true,
                },
              },
            ],
            '@babel/typescript',
          ],
        },
        include: [__dirname],
        exclude: /node_modules/,
      },
    ],
  },
};