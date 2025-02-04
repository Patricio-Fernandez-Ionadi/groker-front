import React, { useContext, useState } from 'react'

import { validateProductData } from '../../utils/validation'
import { AppContext } from '../../context/AppContext'
import { FormContext } from '../../context/FormContext'

/**
 * Componente para añadir un nuevo producto al inventario.
 */
const AddProduct = () => {
	const [productData, setProductData] = useState({
		name: '',
		stock: '',
		nitrogen: '',
		phosphorus: '',
		potassium: '',
		type: '',
	})
	const [errors, setErrors] = useState({})

	const { addProduct } = useContext(AppContext)
	const { closeAddProductForm } = useContext(FormContext)

	const handleChange = (e) => {
		const { name, value } = e.target
		setProductData({ ...productData, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const validationErrors = validateProductData(productData)
		setErrors(validationErrors)

		// si no hay errores de validación, agregar el producto
		if (Object.keys(validationErrors).length > 0) return

		addProduct(productData)

		// resetear el formulario
		setProductData({
			name: '',
			stock: '',
			nitrogen: '',
			phosphorus: '',
			potassium: '',
			type: '',
		})

		closeAddProductForm()
	}

	return (
		<div>
			<div>
				<input
					type="text"
					name="name"
					value={productData.name}
					onChange={handleChange}
					placeholder="Nombre del producto"
				/>
				{errors.name && <span className="error">{errors.name}</span>}

				<input
					type="number"
					name="stock"
					value={productData.stock}
					onChange={handleChange}
					placeholder="Stock (ml)"
				/>
				{errors.stock && <span className="error">{errors.stock}</span>}
			</div>
			<div>
				<input
					type="number"
					name="nitrogen"
					value={productData.nitrogen}
					onChange={handleChange}
					placeholder="Nitrógeno (%)"
				/>

				<input
					type="number"
					name="potassium"
					value={productData.potassium}
					onChange={handleChange}
					placeholder="Potasio (%)"
				/>

				<input
					type="number"
					name="phosphorus"
					value={productData.phosphorus}
					onChange={handleChange}
					placeholder="Fósforo (%)"
				/>

				<select name="type" value={productData.type} onChange={handleChange}>
					<option value="">Seleccione un tipo</option>
					<option value="organic">Organico</option>
					<option value="mineral">Mineral</option>
				</select>
			</div>
			<button onClick={handleSubmit}>Añadir Producto</button>
		</div>
	)
}

export default AddProduct
