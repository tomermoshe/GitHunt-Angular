const HtmlWebpackPlugin = require('html-webpack-plugin');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

module.exports = {
  entry: './ui/index.ts',
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.css', '.json'],
  },
  module: {
    loaders: [{
      test: /\.css/,
      loader: 'style!css',
    }, {
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'ui/index.html',
    }),
    new DashboardPlugin(dashboard.setData),
  ],
  devServer: {
    proxy: {
      '/graphql': 'http://localhost:3010/graphql',
      '/login/*': 'http://localhost:3010',
      '/logout': 'http://localhost:3010',
    },
    historyApiFallback: {
      index: '/',
    },
  },
};
