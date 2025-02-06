import { useContext } from 'react'
import { ProductsContext } from '../../context/products/ProductsContext'

export function useStockManagement() {
	const { updateProductStock } = useContext(ProductsContext)

	const calculateStockDifference = (previousProducts, newProducts) => {
		const stockDifferences = []

		// Iterar sobre los productos nuevos
		newProducts.forEach((newProduct) => {
			const previousProduct = previousProducts.find(
				(p) => p.product._id === newProduct.product._id
			)

			if (previousProduct) {
				// Si el producto ya existía, calcular la diferencia
				const difference = -(
					newProduct.productAmount - previousProduct.productAmount
				)
				stockDifferences.push({
					productId: newProduct.product._id,
					difference,
				})
			} else {
				// Si es un producto nuevo, restar la cantidad completa
				stockDifferences.push({
					productId: newProduct.product._id,
					difference: -newProduct.productAmount,
				})
			}
		})

		// Iterar sobre los productos antiguos para detectar eliminaciones
		previousProducts.forEach((prevProduct) => {
			const newProduct = newProducts.find(
				(p) => p.product._id === prevProduct.product._id
			)

			if (!newProduct) {
				// Si el producto fue eliminado, devolverlo al stock
				stockDifferences.push({
					productId: prevProduct.product._id,
					difference: prevProduct.productAmount,
				})
			}
		})

		return stockDifferences
	}

	const applyStockDifferences = (stockDifferences) => {
		stockDifferences.forEach(({ productId, difference }) => {
			updateProductStock(productId, difference)
		})
	}

	return { calculateStockDifference, applyStockDifferences }
}
