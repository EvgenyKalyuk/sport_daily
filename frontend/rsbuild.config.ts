import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Docs: https://rsbuild.rs/config/
export default defineConfig({
	plugins: [
		pluginReact(),
		pluginBabel({
			include: /\.(?:jsx|tsx)$/,
			babelLoaderOptions(options) {
				options.plugins?.unshift('babel-plugin-react-compiler');
			},
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@/app': resolve(__dirname, './src/app'),
			'@/features': resolve(__dirname, './src/features'),
			'@/shared': resolve(__dirname, './src/shared'),
			'@/pages': resolve(__dirname, './src/pages'),
			'@/widgets': resolve(__dirname, './src/widgets'),
			'@/assets': resolve(__dirname, './src/assets'),
		},
	},
});
