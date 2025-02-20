import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/',
	server: {
		proxy: {
			'/api': {
				target: import.meta.env.VITE_API_URL,
				changeOrigin: true,
				secure: false,
			},
		},
	},
})
