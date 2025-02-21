import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const apiUrl =
	process.env.VITE_ENVIRONMENT === 'development'
		? process.env.VITE_API_URL_LOCAL
		: process.env.VITE_API_URL

console.log('API URL:', apiUrl)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: './',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'Groker/date': path.resolve(__dirname, './src/app/modules/date/dates.js'),
			'Groker/components': path.resolve(
				__dirname,
				'./src/app/modules/components/index.js'
			),
			'Groker/icons': path.resolve(
				__dirname,
				'./src/app/modules/icons/Icons.jsx'
			),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: apiUrl,
				changeOrigin: true,
				secure: false,
			},
		},
	},
})
