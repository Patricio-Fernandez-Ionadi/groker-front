import config from '../../app/utils/config'

/**
 * Obtiene todas las plantas del inventario haciendo una solicitud GET a la API.
 * @returns {Promise<Object[]>} - Un arreglo de objetos que representan a las plantas.
 */
export const api_getPlants = async () => {
	try {
		const response = await fetch(`${config.apiUrl}/api/plants`)
		const data = await response.json()
		// console.log('Plantas obtenidas:', data)
		return data
	} catch (error) {
		console.error('Error al obtener plantas:', error)
	}
}

/**
 * Agrega una nueva planta al inventario enviando una solicitud POST a la API.
 * @param {Object} plantData - Los datos de la planta a agregar.
 * @returns {Promise<Object>} - Los datos de la planta agregada.
 */
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
		// console.log('Planta agregada:', data)
		return data
	} catch (error) {
		console.error('Error al agregar planta:', error)
	}
}

/**
 * Elimina una planta.
 * @param {string} plantId - ID de la planta a eliminar.
 * @returns {Promise<Object>} - La planta eliminada.
 */
export const api_deletePlant = async (plantId) => {
	try {
		const response = await fetch(`${config.apiUrl}/api/plants/${plantId}`, {
			method: 'DELETE',
		})
		const data = await response.json()
		// console.log('Planta eliminada:', data)
		return data
	} catch (error) {
		console.error('Error al eliminar planta:', error)
	}
}

/**
 * Edita los datos de una planta existente enviando una solicitud PUT a la API.
 * @param {Object} plantData - Los nuevos datos de la planta, incluyendo su ID.
 * @returns {Promise<Object>} - Los datos de la planta editada.
 */
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
