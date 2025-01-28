import React, { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { sampleProducts } from '../utils/sampleData'

export const ProductContext = createContext()

/**
 * Proveedor del contexto de productos.
 * @param {Object} props - Props del componente.
 */
export const ProductProvider = (props) => {
	const [products, setProducts] = useState([])

	// Cargar productos desde localStorage al montar el componente
	useEffect(() => {
		const storedProducts = JSON.parse(localStorage.getItem('products'))
		if (storedProducts) {
			setProducts(storedProducts)
		} else {
			setProducts(sampleProducts)
		}
	}, [])

	// Guardar productos en localStorage cuando cambie el estado de productos
	useEffect(() => {
		localStorage.setItem('products', JSON.stringify(products))
	}, [products])

	/**
	 * Añade un nuevo producto al inventario.
	 * @param {Object} productData - Datos del nuevo producto.
	 */
	const addProduct = (productData) => {
		const newProduct = {
			id: uuidv4(),
			name: productData.name,
			stock: productData.stock,
			nitrogen: productData.nitrogen,
			potassium: productData.potassium,
			phosphorus: productData.phosphorus,
		}
		setProducts([...products, newProduct])
	}

	/**
	 * Actualiza el stock de un producto.
	 * @param {string} productId - ID del producto.
	 * @param {number} amount - Cantidad utilizada.
	 */
	const updateProductStock = (productId, amount) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.id === productId
					? { ...product, stock: product.stock - amount } // Asegurarse de restar la cantidad correcta
					: product
			)
		)
	}

	return (
		<ProductContext.Provider
			value={{ products, addProduct, updateProductStock }}
		>
			{props.children}
		</ProductContext.Provider>
	)
}
