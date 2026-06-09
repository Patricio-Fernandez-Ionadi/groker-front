import config from '../../app/utils/config'

export const api_getProducts = async () => {
	const response = await fetch(`${config.apiUrl}/api/products`)
	if (!response.ok) {
		throw new Error('Error al obtener productos')
	}
	return response.json()
}

export const api_addProduct = async (productData) => {
	const response = await fetch(`${config.apiUrl}/api/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(productData),
	})
	if (!response.ok) {
		throw new Error('Error al agregar producto')
	}
	return response.json()
}

export const api_editProduct = async (updatedProduct) => {
	const response = await fetch(
		`${config.apiUrl}/api/products/${updatedProduct._id}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedProduct),
		}
	)
	if (!response.ok) {
		throw new Error('Error al editar producto')
	}
	return response.json()
}

export const api_deleteProduct = async (productId) => {
	const response = await fetch(`${config.apiUrl}/api/products/${productId}`, {
		method: 'DELETE',
	})
	if (!response.ok) {
		throw new Error('Error al eliminar producto')
	}
	return response.json()
}
