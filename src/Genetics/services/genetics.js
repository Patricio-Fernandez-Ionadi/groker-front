import config from '../../app/utils/config'

export const api_getGenetics = async () => {
	try {
		const response = await fetch(`${config.apiUrl}/api/genetics`)
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error al obtener genéticas:', error)
	}
}

export const api_addGenetic = async (geneticData) => {
	try {
		const response = await fetch(`${config.apiUrl}/api/genetics`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(geneticData),
		})
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error al agregar genética:', error)
	}
}

export const api_deleteGenetic = async (id) => {
	try {
		const response = await fetch(`${config.apiUrl}/api/genetics/${id}`, {
			method: 'DELETE',
		})
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error al eliminar genética:', error)
	}
}
