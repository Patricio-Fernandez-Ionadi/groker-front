import { updateStock } from '../index'

/* export const calculateStockDifference = (previousProducts, newProducts) => {
	const stockDifferences = []

	// Iterar sobre los productos nuevos
	newProducts.forEach((newProduct) => {
		const previousProduct = previousProducts.find(
			(p) => p._id === newProduct.product._id
		)

		if (previousProduct) {
			// Si el producto ya existía, calcular la diferencia
			const difference = -(
				newProduct.productAmount - previousProduct.productAmount
			)

			console.log(difference)

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
} */

export const calculateStockDifference = (previousProducts, newProducts) => {
	const stockDifferences = []

	// Crear un mapa con los productos previos para acceso rápido
	const previousMap = new Map(
		previousProducts.map((p) => [p.product._id, p.productAmount])
	)

	newProducts.forEach((newProduct) => {
		const productId = newProduct.product._id
		const prevAmount = previousMap.get(productId) ?? 0 // Si no existía, es 0
		const newAmount = newProduct.productAmount
		const difference = newAmount - prevAmount // Diferencia real

		if (difference !== 0) {
			stockDifferences.push({ productId, difference: -difference }) // Ajuste correcto del stock
		}

		// Eliminar del mapa para identificar productos eliminados después
		previousMap.delete(newProduct.product._id)
	})

	console.log('Previous Products:', previousProducts)
	console.log('New Products:', newProducts)
	console.log('Stock Differences Calculated:', stockDifferences)

	// Cualquier producto que quedó en previousMap significa que fue eliminado
	/* previousMap.forEach((prevAmount, productId) => {
		stockDifferences.push({
			productId,
			difference: prevAmount, // Devolver la cantidad eliminada al stock
		})
	}) */

	return stockDifferences
}

export const applyStockDifferences = (stockDifferences, dispatch) => {
	console.log('Applying Stock Differences:', stockDifferences)
	stockDifferences.forEach((item) => {
		const { productId, difference } = item
		dispatch(updateStock({ productId, difference }))
	})
}
