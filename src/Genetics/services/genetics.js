import config from '../../app/utils/config'

export const api_getGenetics = async () => {
	const response = await fetch(`${config.apiUrl}/api/genetics`)
	if (!response.ok) {
		throw new Error('Error al obtener genéticas')
	}
	return response.json()
}

export const api_addGenetic = async (geneticData) => {
	const response = await fetch(`${config.apiUrl}/api/genetics`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(geneticData),
	})
	if (!response.ok) {
		throw new Error('Error al agregar genética')
	}
	return response.json()
}

export const api_deleteGenetic = async (id) => {
	const response = await fetch(`${config.apiUrl}/api/genetics/${id}`, {
		method: 'DELETE',
	})
	if (!response.ok) {
		throw new Error('Error al eliminar genética')
	}
	return response.json()
}
