import config from '../../app/utils/config'

// Ejemplo de cómo obtener todas las genéticas
export const api_getGenetics = async () => {
	try {
		const response = await fetch(`${config.apiUrl}/api/genetics`)
		const data = await response.json()
		// console.log('Genéticas obtenidas:', data)
		return data
	} catch (error) {
		console.error('Error al obtener genéticas:', error)
	}
}
// Ejemplo de cómo agregar una nueva genética
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
		// console.log('Genética agregada:', data)
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
		// console.log('Genética eliminada:', data)
		return data
	} catch (error) {
		console.error('Error al eliminar genética:', error)
	}
}
