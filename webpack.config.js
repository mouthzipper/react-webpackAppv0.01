var path = require('path');
var webpack = require( 'webpack' );
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require( 'webpack-merge' );

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: path.resolve(ROOT_PATH, 'app'),
  output: {
	path: path.resolve(ROOT_PATH, 'build'),
	filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
 };

if( TARGET === 'start' || !TARGET ) {
	module.exports = merge( common, {
		devtool : 'eval-source-map',
		 module: {
			loaders: [
				{
					test: /\.css$/,
					loaders: [ 'style', 'css' ],
					include: path.resolve( ROOT_PATH, 'app' )
				},
				{
		          test: /\.jsx?$/,
		          loaders: ['react-hot','babel'],
		          include: path.resolve(ROOT_PATH, 'app')
		        }
			]
		  },
		 devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true
		 },
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlwebpackPlugin({
			  title: 'Kanban app'
			})
		]
	})
}