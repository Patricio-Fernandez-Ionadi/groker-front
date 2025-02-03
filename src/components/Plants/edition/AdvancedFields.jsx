import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useEditPlantContext } from '../../../context/PlantEditContext'
import { AddGeneticButton } from '../../Genetics/AddGeneticButton'

export function AdvancedFields() {
	const { state } = useContext(AppContext)
	const { genetics } = state

	const { editedPlant, handlePlantChange, showAdvancedFields } =
		useEditPlantContext()

	if (!showAdvancedFields) return null

	return (
		<>
			<div>
				<label>
					Fecha de ingreso:
					<input
						type="date"
						name="entryDate"
						value={editedPlant.entryDate}
						onChange={handlePlantChange}
						placeholder="Fecha de ingreso"
					/>
				</label>
				<label>
					Nombre de la planta:
					<input
						type="text"
						name="name"
						value={editedPlant.name}
						onChange={handlePlantChange}
						placeholder="Nombre de la planta"
					/>
				</label>
				<label>
					Genética:
					<select name="genetic" onChange={handlePlantChange}>
						<option value={editedPlant.genetic}>Seleccione una genética</option>
						{genetics.map((genetic) => (
							<option key={genetic._id} value={genetic.name}>
								{genetic.name}
							</option>
						))}
					</select>
					<AddGeneticButton />
				</label>
				<label>
					Cambio estimado:
					<input
						type="date"
						name="estimatedChange"
						value={editedPlant.estimatedChange}
						onChange={handlePlantChange}
					/>
				</label>
			</div>
		</>
	)
}
