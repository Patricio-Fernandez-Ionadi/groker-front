import { store_updateStock } from '../index'

export const calculateStockDifference = (previousProducts, newProducts) => {
	const stockDifferences = []

	// Iterar sobre los productos previos y verificar cambios
	previousProducts.forEach((prevProduct) => {
		const matchingNewProduct = newProducts.find(
			(newProduct) => newProduct.product._id === prevProduct.product._id
		)

		if (matchingNewProduct) {
			// Si el producto sigue en la lista, calcular la diferencia de cantidad
			const difference =
				matchingNewProduct.productAmount - prevProduct.productAmount
			if (difference !== 0) {
				stockDifferences.push({
					productId: prevProduct.product._id,
					difference: -difference, // Se resta del stock si se aumenta la cantidad, y viceversa
				})
			}
		} else {
			// Si el producto ya no está en la nueva lista, se reembolsa completamente su cantidad
			stockDifferences.push({
				productId: prevProduct.product._id,
				difference: prevProduct.productAmount, // Se devuelve el stock eliminado
			})
		}
	})

	// Verificar si hay productos nuevos que antes no existían
	newProducts.forEach((newProduct) => {
		const existedBefore = previousProducts.some(
			(prevProduct) => prevProduct.product._id === newProduct.product._id
		)

		if (!existedBefore) {
			// Si el producto no estaba antes, restar la cantidad al stock
			stockDifferences.push({
				productId: newProduct.product._id,
				difference: -newProduct.productAmount,
			})
		}
	})

	return stockDifferences
}

export const applyStockDifferences = (stockDifferences, dispatch) => {
	stockDifferences.forEach(({ productId, difference }) => {
		dispatch(store_updateStock({ productId, difference }))
	})
}
