//@ts-check

'use strict';

const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
const config = {
	target: 'node',
	entry: './src/extension.ts',
	output: {
		path: path.resolve(__dirname, 'out'),
		filename: 'extension.js',
		libraryTarget: "commonjs2",
		devtoolModuleFilenameTemplate: "../[resource-path]",
	},
	devtool: 'source-map',
	externals: {
		vscode: "commonjs vscode",
		bufferutil: "bufferutil",
		"utf-8-validate": "utf-8-validate",
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [{
				loader: 'ts-loader'
			}]
		}]
	},
	plugins: [
		new webpack.IgnorePlugin({
			resourceRegExp: /crypto\/build\/Release\/sshcrypto\.node$/,
		}),
		new webpack.IgnorePlugin({
			resourceRegExp: /cpu-features/,
		})
	]
}

module.exports = (_env, argv) => {
	if (argv.mode === 'production') {
		config.devtool = 'source-map';
	}

	return config;
};
