import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
	plugins: [pluginReact()],
	source: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@/store': path.resolve(__dirname, './src/store'),
			'@/components': path.resolve(__dirname, './src/components'),
		},
	},
});
