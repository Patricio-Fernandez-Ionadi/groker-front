import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

import useProductForm from '../hooks/useProductForm'

/**
 * Componente para añadir un nuevo producto al inventario.
 */
const AddProduct = () => {
	const { addProduct } = useContext(ProductContext)
	const { productData, handleChange, resetForm } = useProductForm({
		name: '',
		stock: '',
		nitrogen: '',
		phosphorus: '',
		potassium: '',
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		addProduct(productData)
		resetForm()
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Nombre del producto:
				<input
					type="text"
					name="name"
					value={productData.name}
					onChange={handleChange}
					placeholder="Nombre del producto"
				/>
			</label>
			<label>
				Stock (ml):
				<input
					type="number"
					name="stock"
					value={productData.stock}
					onChange={handleChange}
					placeholder="Stock (ml)"
				/>
			</label>
			<label>
				Nitrógeno (%):
				<input
					type="number"
					name="nitrogen"
					value={productData.nitrogen}
					onChange={handleChange}
					placeholder="Nitrógeno (%)"
				/>
			</label>
			<label>
				Potasio (%):
				<input
					type="number"
					name="potassium"
					value={productData.potassium}
					onChange={handleChange}
					placeholder="Potasio (%)"
				/>
			</label>
			<label>
				Fósforo (%):
				<input
					type="number"
					name="phosphorus"
					value={productData.phosphorus}
					onChange={handleChange}
					placeholder="Fósforo (%)"
				/>
			</label>
			<button type="submit">Añadir Producto</button>
		</form>
	)
}

export default AddProduct
