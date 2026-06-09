import config from '../../app/utils/config'

export const api_getPlants = async () => {
	try {
		const response = await fetch(`${config.apiUrl}/api/plants`)
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error al obtener plantas:', error)
	}
}

export const api_addPlant = async (plantData) => {
	try {
		const response = await fetch(`${config.apiUrl}/api/plants`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(plantData),
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error al agregar planta:', error)
	}
}

export const api_deletePlant = async (plantId) => {
	try {
		const response = await fetch(`${config.apiUrl}/api/plants/${plantId}`, {
			method: 'DELETE',
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error al eliminar planta:', error)
	}
}

export const api_updatePlant = async (plantData) => {
	try {
		const response = await fetch(
			`${config.apiUrl}/api/plants/${plantData._id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(plantData),
			}
		)
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error al editar planta:', error)
	}
}
