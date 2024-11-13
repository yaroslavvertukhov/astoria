/**
 * Webpack main configuration file
 */

const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

const templateFiles = fs
	.readdirSync(path.resolve(environment.paths.source, 'html'))
	.filter((file) =>
		['.html', '.ejs'].includes(path.extname(file).toLowerCase())
	)
	.map((filename) => ({
		input: filename,
		output: filename.replace(/\.ejs$/, '.html'),
	}));

const htmlPluginEntries = templateFiles.map(
	(template) =>
		new HTMLWebpackPlugin({
			minify: false,
			inject: 'body',
			hash: false,
			filename: template.output,
			template: path.resolve(environment.paths.source, 'html', template.input),
			favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
		})
);

module.exports = {
	entry: {
		app: path.resolve(environment.paths.source, 'js', 'app.js'),
	},
	output: {
		filename: 'js/[name].js',
		path: environment.paths.output,
	},
	module: {
		rules: [
			{
				test: /\.((c|sa|sc)ss)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: environment.limits.images,
					},
				},
				generator: {
					filename: 'fonts/[name].[hash:6][ext]',
				},
			},
			{
				test: /\.ejs$/,
				use: {
					loader: 'ejs-compiled-loader',
					options: {
						htmlmin: false,
						htmlminOptions: {
							removeComments: false,
						},
					},
				},
			},
		],
	},
	optimization: {
		minimizer: [
			'...',
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						// Lossless optimization with custom option
						// Feel free to experiment with options for better result for you
						plugins: [
							['gifsicle', { interlaced: true }],
							// ['jpegtran', { progressive: true }],
							['optipng', { optimizationLevel: 5 }],
							// Svgo configuration here https://github.com/svg/svgo#configuration
							[
								'svgo',
								{
									plugins: [
										{
											name: 'removeViewBox',
											active: false,
										},
									],
								},
							],
						],
					},
				},
			}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(environment.paths.source, 'images', 'content'),
					to: path.resolve(environment.paths.output, 'images', 'content'),
					toType: 'dir',
					globOptions: {
						ignore: ['*.DS_Store', 'Thumbs.db'],
					},
				},
				{
					from: path.resolve(environment.paths.source, 'images', 'design'),
					to: path.resolve(environment.paths.output, 'images', 'design'),
					toType: 'dir',
					globOptions: {
						ignore: ['*.DS_Store', 'Thumbs.db'],
					},
				},
				{
					from: path.resolve(environment.paths.source, 'videos'),
					to: path.resolve(environment.paths.output, 'videos'),
					toType: 'dir',
					globOptions: {
						ignore: ['*.DS_Store', 'Thumbs.db'],
					},
				},
				{
					from: path.resolve(environment.paths.source, 'docs'),
					to: path.resolve(environment.paths.output, 'docs'),
					toType: 'dir',
					globOptions: {
						ignore: ['*.DS_Store', 'Thumbs.db'],
					},
				},
				{
					from: path.resolve(environment.paths.source, 'fonts'),
					to: path.resolve(environment.paths.output, 'fonts'),
					toType: 'dir',
					globOptions: {
						ignore: ['*.DS_Store', 'Thumbs.db'],
					}
				}
			],
		}),
	].concat(htmlPluginEntries),
	target: 'web',
};
