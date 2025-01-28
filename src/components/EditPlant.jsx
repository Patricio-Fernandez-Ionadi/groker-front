import React, { useContext, useState } from 'react'
import { PlantContext } from '../context/PlantContext'
import { ProductContext } from '../context/ProductContext'
import useEditPlantForm from '../hooks/useEditPlantForm'
import { translateField } from '../utils/translations'
import WateringForm from './WateringForm'
import PlantDetailsForm from './PlantDetailsForm'

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
		lastWatered: new Date().toISOString().split('T')[0], // Fecha actual por defecto
	})

	const [isWatered, setIsWatered] = useState(false)

	const handleCheckboxChange = () => {
		setIsWatered(!isWatered)
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
						-parseFloat(productUsed.productAmount) // Pasar la cantidad como negativa
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
				lastWatered: new Date().toISOString().split('T')[0], // Fecha actual por defecto
			})
		}
	}

	if (!selectedPlant) return <div>Seleccione una planta para editar</div>

	return (
		<form onSubmit={handleSubmit}>
			<PlantDetailsForm
				plantData={plantData}
				handleChange={handleChange}
				showAdvancedFields={showAdvancedFields}
			/>
			<div className="form-group">
				<label>
					<input
						type="checkbox"
						checked={isWatered}
						onChange={handleCheckboxChange}
					/>
					¿Hubo riego?
				</label>
				{isWatered && (
					<WateringForm
						wateringData={wateringData}
						setWateringData={setWateringData}
						products={products}
					/>
				)}
			</div>
			<div className="form-group">
				<label>
					Notas:
					<textarea
						name="note"
						value={note}
						onChange={handleNoteChange}
						placeholder="Añadir una nota"
					/>
				</label>
			</div>
			<div className="form-group">
				<button type="button" onClick={toggleAdvancedFields}>
					{showAdvancedFields
						? 'Ocultar Campos Avanzados'
						: 'Mostrar Campos Avanzados'}
				</button>
				<button type="submit">Guardar Cambios</button>
			</div>
		</form>
	)
}

export default EditPlant
