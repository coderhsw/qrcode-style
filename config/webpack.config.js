const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, '../js/qrcode.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'qrcodeStyle.js',
		chunkFilename: '[name].chunk.js',
		libraryTarget: 'umd',
		library: 'QRCode',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					// 去除debugger和console
					drop_debugger: true,
					drop_console: true,
					// 删除所有的 `console` 语句，可以兼容ie浏览器
					drop_console: true,
					// 内嵌定义了但是只用到一次的变量
					collapse_vars: true,
					// 提取出出现多次但是没有定义成变量去引用的静态值
					reduce_vars: true,
				},
			},
		}),
	],
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {},
		},
	},
};
