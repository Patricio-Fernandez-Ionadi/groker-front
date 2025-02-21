const environment = import.meta.env.VITE_ENVIRONMENT

const config = {
	apiUrl:
		environment === 'development'
			? import.meta.env.VITE_API_URL_LOCAL
			: import.meta.env.VITE_API_URL,
}

export default config
