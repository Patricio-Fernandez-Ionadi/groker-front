export const api_getProducts = async () => {
	try {
		const response = await fetch('/api/products')
		const data = await response.json()
		// console.log('Productos obtenidos:', data)
		return data
	} catch (error) {
		console.error('Error al obtener productos:', error)
	}
}

// Ejemplo de cómo agregar un producto
export const api_addProduct = async (productData) => {
	try {
		const response = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productData),
		})

		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error al agregar producto:', error)
		throw error
	}
}

// Ejemplo de cómo editar un producto
export const api_editProduct = async (productId, productData) => {
	try {
		const response = await fetch(`/api/products/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productData),
		})
		const data = await response.json()
		// console.log('Producto editado:', data)
		return data
	} catch (error) {
		console.error('Error al editar producto:', error)
	}
}

// Ejemplo de cómo eliminar un producto
export const api_deleteProduct = async (productId) => {
	try {
		const response = await fetch(`/api/products/${productId}`, {
			method: 'DELETE',
		})
		const data = await response.json()
		// console.log('Producto eliminado:', data)
		return data
	} catch (error) {
		console.error('Error al eliminar producto:', error)
	}
}
