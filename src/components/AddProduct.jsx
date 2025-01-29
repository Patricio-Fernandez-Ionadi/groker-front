import React, { useContext, useState } from 'react'
import { ProductContext } from '../context/ProductContext'

import useProductForm from '../hooks/useProductForm'
import { validateProductData } from '../utils/validation'

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
	const [errors, setErrors] = useState({})

	const handleSubmit = (e) => {
		e.preventDefault()

		const validationErrors = validateProductData(productData)
		setErrors(validationErrors)

		if (Object.keys(validationErrors).length > 0) return
		addProduct(productData)
		resetForm()
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>
					Nombre:
					<input
						type="text"
						name="name"
						value={productData.name}
						onChange={handleChange}
						placeholder="Nombre del producto"
					/>
					{errors.name && <span className="error">{errors.name}</span>}
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
					{errors.stock && <span className="error">{errors.stock}</span>}
				</label>
			</div>
			<div>
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
			</div>
			<button type="submit">Añadir Producto</button>
		</form>
	)
}

export default AddProduct
