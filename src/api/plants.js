/**
 * Obtiene todas las plantas del inventario haciendo una solicitud GET a la API.
 * @returns {Promise<Object[]>} - Un arreglo de objetos que representan a las plantas.
 */
export const api_getPlants = async () => {
	try {
		const response = await fetch('/api/plants')
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
		const response = await fetch('/api/plants', {
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
		const response = await fetch(`/api/plants/${plantId}`, {
			method: 'DELETE',
		})
		const data = await response.json()
		// console.log('Planta eliminada:', data)
		return data
	} catch (error) {
		console.error('Error al eliminar planta:', error)
	}
}

// ----- TODO -----

// Ejemplo de cómo editar una planta
export const api_editPlant = async (plantId, plantData) => {
	try {
		const response = await fetch(`/api/plants/${plantId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(plantData),
		})
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		console.log('Planta editada:', data)
		return data
	} catch (error) {
		console.error('Error al editar planta:', error)
	}
}

// Ejemplo de cómo agregar un registro al historial de una planta
export const api_addHistoryEntry = async (plantId, historyData) => {
	try {
		const response = await fetch(`/api/plants/${plantId}/history`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(historyData),
		})
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		console.log('Entrada de historial agregada:', data)
		return data
	} catch (error) {
		console.error('Error al agregar entrada de historial:', error)
	}
}
