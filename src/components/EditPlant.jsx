import React, { useContext, useState } from 'react'
import { PlantContext } from '../context/PlantContext'
import { ProductContext } from '../context/ProductContext'
import useEditPlantForm from '../hooks/useEditPlantForm'
import { translateField } from '../utils/translations'

/**
 * Componente para editar los detalles de una planta específica.
 */
const EditPlant = () => {
	const { selectedPlant, updatePlant, addNote } = useContext(PlantContext)
	const { products, updateProductStock } = useContext(ProductContext)
	const {
		plantData,
		note,
		showAdvancedFields,
		handleChange,
		handleNoteChange,
		toggleAdvancedFields,
		setNote,
	} = useEditPlantForm(selectedPlant)

	const [wateringData, setWateringData] = useState({
		amount: '',
		productsUsed: [{ product: '', productAmount: '' }],
		ph: '',
		ec: '',
		temperature: '',
		humidity: '',
	})

	const handleWateringChange = (e, index) => {
		const { name, value } = e.target
		if (name === 'product' || name === 'productAmount') {
			const newProductsUsed = [...wateringData.productsUsed]
			newProductsUsed[index][name] = value
			setWateringData({
				...wateringData,
				productsUsed: newProductsUsed,
			})
		} else {
			setWateringData({
				...wateringData,
				[name]: value,
			})
		}
	}

	const addProductField = () => {
		setWateringData({
			...wateringData,
			productsUsed: [
				...wateringData.productsUsed,
				{ product: '', productAmount: '' },
			],
		})
	}

	const removeProductField = (index) => {
		const newProductsUsed = wateringData.productsUsed.filter(
			(_, i) => i !== index
		)
		setWateringData({
			...wateringData,
			productsUsed: newProductsUsed,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (plantData) {
			const changeDescription = `Planta actualizada: ${Object.keys(plantData)
				.map((key) => `${translateField(key)}: ${plantData[key]}`)
				.join(', ')}`
			updatePlant(plantData, changeDescription, wateringData, products)
			if (note.trim()) {
				addNote(selectedPlant.id, note.trim())
				setNote('')
			}
			// Asegurarse de que ambos productos se actualicen correctamente en el stock
			wateringData.productsUsed.forEach((productUsed) => {
				if (productUsed.product && productUsed.productAmount) {
					updateProductStock(
						productUsed.product,
						productUsed.productAmount // Asegurarse de restar la cantidad correcta
					)
				}
			})
			// Limpiar los campos del formulario
			setWateringData({
				amount: '',
				productsUsed: [{ product: '', productAmount: '' }],
				ph: '',
				ec: '',
				temperature: '',
				humidity: '',
			})
		}
	}

	if (!selectedPlant) return <div>Seleccione una planta para editar</div>

	return (
		<form onSubmit={handleSubmit}>
			{showAdvancedFields && (
				<>
					<label>
						Fecha de ingreso:
						<input
							type="date"
							name="entryDate"
							value={plantData.entryDate || ''}
							onChange={handleChange}
							placeholder="Fecha de ingreso"
						/>
					</label>
					<label>
						Nombre de la planta:
						<input
							type="text"
							name="name"
							value={plantData.name || ''}
							onChange={handleChange}
							placeholder="Nombre de la planta"
						/>
					</label>
					<label>
						Genética:
						<input
							type="text"
							name="genetic"
							value={plantData.genetic || ''}
							onChange={handleChange}
							placeholder="Genética"
						/>
					</label>
				</>
			)}
			<label>
				Etapa:
				<select
					name="stage"
					value={plantData.stage || 'Vegetativo'}
					onChange={handleChange}
				>
					<option value="Vegetativo">Vegetativo</option>
					<option value="Floracion">Floración</option>
				</select>
			</label>
			<label>
				Cambio estimado:
				<input
					type="date"
					name="estimatedChange"
					value={plantData.estimatedChange || ''}
					onChange={handleChange}
					placeholder="Cambio estimado"
				/>
			</label>
			<label>
				Último riego:
				<input
					type="date"
					name="lastWatered"
					value={plantData.lastWatered || ''}
					onChange={handleChange}
					placeholder="Último riego"
				/>
			</label>
			<label>
				Tamaño de la maceta:
				<input
					type="text"
					name="potSize"
					value={plantData.potSize || ''}
					onChange={handleChange}
					placeholder="Tamaño de la maceta"
				/>
			</label>
			<label>
				<input
					type="checkbox"
					name="isFinalPot"
					checked={plantData.isFinalPot || false}
					onChange={handleChange}
				/>
				Maceta final
			</label>
			<label>
				<input
					type="checkbox"
					name="underObservation"
					checked={plantData.underObservation || false}
					onChange={handleChange}
				/>
				Bajo observación
			</label>
			<label>
				Notas:
				<textarea
					name="note"
					value={note}
					onChange={handleNoteChange}
					placeholder="Añadir una nota"
				/>
			</label>
			<label>
				Cantidad de agua (ml):
				<input
					type="number"
					name="amount"
					value={wateringData.amount}
					onChange={handleWateringChange}
					placeholder="Cantidad de agua (ml)"
				/>
			</label>
			{wateringData.productsUsed.map((productUsed, index) => (
				<div key={index}>
					<label>
						Producto:
						<select
							name="product"
							value={productUsed.product}
							onChange={(e) => handleWateringChange(e, index)}
						>
							<option value="">Seleccionar producto</option>
							{products.map((product) => (
								<option key={product.id} value={product.id}>
									{product.name}
								</option>
							))}
						</select>
					</label>
					<label>
						Cantidad de producto (ml):
						<input
							type="number"
							name="productAmount"
							value={productUsed.productAmount}
							onChange={(e) => handleWateringChange(e, index)}
							placeholder="Cantidad de producto (ml)"
						/>
					</label>
					<button type="button" onClick={() => removeProductField(index)}>
						Eliminar Producto
					</button>
				</div>
			))}
			<button type="button" onClick={addProductField}>
				Añadir Producto
			</button>
			<label>
				pH del agua:
				<input
					type="number"
					name="ph"
					value={wateringData.ph}
					onChange={handleWateringChange}
					placeholder="pH del agua"
				/>
			</label>
			<label>
				EC del agua:
				<input
					type="number"
					name="ec"
					value={wateringData.ec}
					onChange={handleWateringChange}
					placeholder="EC del agua"
				/>
			</label>
			<label>
				Temperatura (°C):
				<input
					type="number"
					name="temperature"
					value={wateringData.temperature}
					onChange={handleWateringChange}
					placeholder="Temperatura (°C)"
				/>
			</label>
			<label>
				Humedad (%):
				<input
					type="number"
					name="humidity"
					value={wateringData.humidity}
					onChange={handleWateringChange}
					placeholder="Humedad (%)"
				/>
			</label>
			<button type="button" onClick={toggleAdvancedFields}>
				{showAdvancedFields
					? 'Ocultar Campos Avanzados'
					: 'Mostrar Campos Avanzados'}
			</button>
			<button type="submit">Guardar Cambios</button>
		</form>
	)
}

export default EditPlant
