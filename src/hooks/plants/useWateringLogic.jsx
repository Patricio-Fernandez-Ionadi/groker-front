import { useContext, useState } from 'react'
import { ProductsContext } from '../../context/products/ProductsContext'

import { formatDateToISO } from '../../utils/dateUtils'

export const useWateringLogic = (setEditedPlant) => {
	const { products } = useContext(ProductsContext)

	const [wateringData, setWateringData] = useState({
		amount: '',
		productsUsed: [],
		ph: '',
		ec: '',
		lastWatering: '',
	})

	const handleWateringEntry = (e, index = null) => {
		const { name, value } = e.target
		const formattedValue =
			name === 'lastWatering' ? formatDateToISO(value) : value

		setWateringData((prev) => {
			if (index !== null) {
				const updatedProducts = [...prev.productsUsed]
				updatedProducts[index] = {
					...updatedProducts[index],
					[name]: formattedValue,
				}

				if (name === 'product') {
					const product = products.find((p) => p.name === value)
					updatedProducts[index].product = product
				}

				return { ...prev, productsUsed: updatedProducts }
			}
			return { ...prev, [name]: formattedValue }
		})

		if (name === 'lastWatering') {
			setEditedPlant((prev) => ({
				...prev,
				lastWatered: formatDateToISO(value),
			}))
		}
	}

	// Añadir un nuevo producto utilizado en el riego
	const addProductField = () => {
		if (wateringData.productsUsed.length >= products.length) {
			alert(
				'No puedes añadir más productos. Todos los productos disponibles ya están en la lista.'
			)
			return
		}
		setWateringData((prev) => ({
			...prev,
			productsUsed: [...prev.productsUsed, { product: '', productAmount: '' }],
		}))
	}

	/**
	 * Elimina campo de seleccion de producto del formulario
	 * @param {number} index - indice del formulario.
	 */
	const removeProductField = (index) => {
		setWateringData((prev) => ({
			...prev,
			productsUsed: prev.productsUsed.filter((_, i) => i !== index),
		}))
	}
	return {
		wateringData,
		handleWateringEntry,
		addProductField,
		removeProductField,
	}
}
