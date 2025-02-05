import { createContext, useEffect, useState } from 'react'
import {
	api_addProduct,
	api_deleteProduct,
	api_editProduct,
	api_getProducts,
} from '../../api/products'

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
	const [productsState, setProductsState] = useState({
		selectedProduct: null,
		products: [],
	})

	useEffect(() => {
		if (productsState.products.length === 0) {
			__getAllProducts()
		}
	}, [])

	const __getAllProducts = async () => {
		try {
			const products = await api_getProducts()
			setProductsState((prev) => ({ ...prev, products }))
		} catch (error) {
			console.error('Error al obtener productos getAllProductsContext', error)
		}
	}

	const addProduct = async (newProduct) => {
		try {
			const addedProduct = await api_addProduct(newProduct)
			setProductsState((prev) => ({
				...prev,
				products: [...prev.products, addedProduct],
			}))
		} catch (error) {
			handleError(error, 'Error al agregar producto addProductContext')
		}
	}

	const editExistingProduct = async (updatedProduct) => {
		try {
			const updated = await api_editProduct(updatedProduct._id, updatedProduct)
			setProductsState((prev) => ({
				...prev,
				products: prev.products.map((product) =>
					product._id === updatedProduct._id ? updated : product
				),
			}))
		} catch (error) {
			handleError(error, 'Error al editar producto updateProductContext')
		}
	}

	const deleteProduct = async (productId) => {
		try {
			await api_deleteProduct(productId)
			setProductsState((prev) => ({
				...prev,
				products: prev.products.filter((product) => product._id !== productId),
			}))
		} catch (error) {
			handleError(error, 'Error al eliminar producto deleteProductContext')
		}
	}

	const selectProduct = (product) => {
		setProductsState((prev) => ({ ...prev, selectedProduct: product }))
	}
	const removeStateProduct = () => {
		setProductsState((prev) => ({ ...prev, selectedProduct: null }))
	}

	const updateProductStock = async (productId, amount) => {
		const productToUpdate = productsState.products.find(
			(p) => p._id === productId
		)

		if (!productToUpdate) {
			handleError(null, `Producto con ID ${productId} no encontrado.`)
			return
		}

		// Calcular el nuevo stock
		const newStock = productToUpdate.stock + amount

		// actualizacion en el estado de la aplicacion
		setProductsState((prev) => ({
			...prev,
			products: prev.products.map((product) =>
				product._id === productId ? { ...product, stock: newStock } : product
			),
		}))

		// Actualizar el stock en la base de datos
		try {
			await api_editProduct(productId, { ...productToUpdate, stock: newStock })
		} catch (error) {
			handleError(error, 'Error al actualizar el stock en la base de datos')
		}
	}

	return (
		<ProductsContext.Provider
			value={{
				selectProduct,
				removeStateProduct,
				addProduct,
				editExistingProduct,
				deleteProduct,
				updateProductStock,
				products: productsState.products,
				selectedProduct: productsState.selectedProduct,
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}
