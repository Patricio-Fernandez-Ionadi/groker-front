import { useState } from 'react'

/**
 * Hook personalizado para manejar el formulario de productos.
 * @param {Object} initialProductData - Datos iniciales del producto.
 * @returns {Object} - Los datos y funciones del formulario de productos.
 */
const useProductForm = (initialProductData) => {
	const [productData, setProductData] = useState(initialProductData)

	const handleChange = (e) => {
		const { name, value } = e.target
		setProductData({
			...productData,
			[name]: value,
		})
	}

	const resetForm = () => {
		setProductData(initialProductData)
	}

	return {
		productData,
		handleChange,
		resetForm,
	}
}

export default useProductForm
