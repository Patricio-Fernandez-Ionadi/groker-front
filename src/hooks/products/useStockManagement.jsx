import { useContext } from 'react'
import { ProductsContext } from '../../context/products/ProductsContext'

export const useStockManagement = () => {
	const { updateProductStock } = useContext(ProductsContext)

	const calculateStockDifference = (previousProducts, newProducts) => {
		const stockDifferences = []
		newProducts.forEach((newProduct) => {
			const previousProduct = previousProducts.find(
				(p) => p.product._id === newProduct.product._id
			)
			if (previousProduct) {
				const difference = -(
					newProduct.productAmount - previousProduct.productAmount
				)
				stockDifferences.push({ productId: newProduct.product._id, difference })
			} else {
				stockDifferences.push({
					productId: newProduct.product._id,
					difference: -newProduct.productAmount,
				})
			}
		})
		previousProducts.forEach((prevProduct) => {
			if (!newProducts.some((p) => p.product._id === prevProduct.product._id)) {
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
