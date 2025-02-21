import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
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
