// Ejemplo de cómo obtener todas las genéticas
export const getGenetics = async () => {
	try {
		const response = await fetch('/api/genetics')
		const data = await response.json()
		// console.log('Genéticas obtenidas:', data)
		return data
	} catch (error) {
		console.error('Error al obtener genéticas:', error)
	}
}
// Ejemplo de cómo agregar una nueva genética
export const addGenetic = async (geneticData) => {
	try {
		const response = await fetch('/api/genetics', {
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

export const deleteGenetic = async (id) => {
	try {
		const response = await fetch(`/api/genetics/${id}`, {
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
