import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const environment = process.env.NODE_ENV || 'development'

let enve

if (environment === 'development') {
	enve = process.env.VITE_API_URL_LOCAL
} else {
	enve = process.env.VITE_API_URL
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: './',
	server: {
		proxy: {
			'/api': {
				target: enve,
				changeOrigin: true,
				secure: false,
			},
		},
	},
})
