import config from '../../app/utils/config'

export const api_getPlants = async () => {
	const response = await fetch(`${config.apiUrl}/api/plants`)
	if (!response.ok) {
		throw new Error('Error al obtener plantas')
	}
	return response.json()
}

export const api_addPlant = async (plantData) => {
	const response = await fetch(`${config.apiUrl}/api/plants`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(plantData),
	})
	if (!response.ok) {
		throw new Error('Error al agregar planta')
	}
	return response.json()
}

export const api_deletePlant = async (plantId) => {
	const response = await fetch(`${config.apiUrl}/api/plants/${plantId}`, {
		method: 'DELETE',
	})
	if (!response.ok) {
		throw new Error('Error al eliminar planta')
	}
	return response.json()
}

export const api_updatePlant = async (plantData) => {
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
	if (!response.ok) {
		throw new Error('Error al editar planta')
	}
	return response.json()
}
