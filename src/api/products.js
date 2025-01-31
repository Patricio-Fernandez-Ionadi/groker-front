export const getProducts = async () => {
	try {
		const response = await fetch('/api/products')
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		// console.log('Productos obtenidos:', data)
		return data
	} catch (error) {
		console.error('Error al obtener productos:', error)
	}
}

// Ejemplo de cómo agregar un producto
export const addProduct = async (productData) => {
	try {
		const response = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productData),
		})
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		return response
	} catch (error) {
		console.error('Error al agregar producto:', error)
		throw error
	}
}

// Ejemplo de cómo editar un producto
export const editProduct = async (productId, productData) => {
	try {
		const response = await fetch(`/api/products/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productData),
		})
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		console.log('Producto editado:', data)
		return data
	} catch (error) {
		console.error('Error al editar producto:', error)
	}
}

// Ejemplo de cómo eliminar un producto
export const deleteProduct = async (productId) => {
	try {
		const response = await fetch(`/api/products/${productId}`, {
			method: 'DELETE',
		})
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		console.log('Producto eliminado:', data)
		return data
	} catch (error) {
		console.error('Error al eliminar producto:', error)
	}
}
