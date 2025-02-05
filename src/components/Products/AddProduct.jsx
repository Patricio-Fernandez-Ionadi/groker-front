import React, { useContext, useEffect, useState } from 'react'

import { validateProductData } from '../../utils/validation'
import { AppContext } from '../../context/AppContext'
import { FormContext } from '../../context/FormContext'

const defaultProductData = {
	name: '',
	stock: '',
	nitrogen: '',
	phosphorus: '',
	potassium: '',
	type: 'organic',
}

const AddProduct = () => {
	const [productData, setProductData] = useState({ ...defaultProductData })
	const [errors, setErrors] = useState({})

	const { addProduct, state, editExistingProduct } = useContext(AppContext)
	const { selectedProduct } = state
	// console.log(selectedProduct)

	const { closeAddProductForm, isEditProductFormOpen, closeEditProductForm } =
		useContext(FormContext)

	useEffect(() => {
		if (isEditProductFormOpen && selectedProduct) {
			setProductData(selectedProduct)
		} else {
			setProductData(defaultProductData)
		}
	}, [isEditProductFormOpen, selectedProduct])

	const handleChange = (e) => {
		const { name, value } = e.target
		setProductData({ ...productData, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const validationErrors = validateProductData(productData)
		setErrors(validationErrors)

		if (isEditProductFormOpen) {
			editExistingProduct(productData) // implementar la actualización
			closeEditProductForm()
		} else {
			// no se esta editando sino que se quiere agregar un producto
			// si no hay errores de validación, agregar el producto
			if (Object.keys(validationErrors).length > 0) return
			addProduct(productData)
			closeAddProductForm()
		}

		// resetear el formulario
		setProductData(defaultProductData)
	}

	return (
		<div className="add-product-form">
			<h3>{isEditProductFormOpen ? 'Editar Producto' : 'Añadir Producto'}</h3>
			<div className="form-group">
				<label>
					Nombre del producto
					<input
						type="text"
						name="name"
						value={productData.name}
						onChange={handleChange}
						placeholder="Nombre del producto"
						required
					/>
					{errors.name && <span className="error">{errors.name}</span>}
				</label>
				<label>
					Stock (ml)
					<input
						type="number"
						name="stock"
						value={productData.stock}
						onChange={handleChange}
						placeholder="Stock (ml)"
						required
					/>
					{errors.stock && <span className="error">{errors.stock}</span>}
				</label>
			</div>
			<label className="form-group">
				Nitrógeno (%)
				<input
					type="number"
					name="nitrogen"
					value={productData.nitrogen}
					onChange={handleChange}
					placeholder="Nitrógeno (%)"
				/>
			</label>
			<label className="form-group">
				Potasio (%)
				<input
					type="number"
					name="potassium"
					value={productData.potassium}
					onChange={handleChange}
					placeholder="Potasio (%)"
				/>
			</label>
			<label className="form-group">
				Fósforo (%)
				<input
					type="number"
					name="phosphorus"
					value={productData.phosphorus}
					onChange={handleChange}
					placeholder="Fósforo (%)"
				/>
			</label>
			<label className="form-group">
				Tipo de producto
				<select
					name="type"
					defaultValue={productData.type}
					onChange={handleChange}
				>
					<option>Seleccione un tipo</option>
					<option value="organic">Organico</option>
					<option value="mineral">Mineral</option>
				</select>
			</label>
			<button onClick={handleSubmit} className="submit-button">
				{isEditProductFormOpen ? 'Guardar Cambios' : 'Añadir Producto'}
			</button>
		</div>
	)
}

export default AddProduct
