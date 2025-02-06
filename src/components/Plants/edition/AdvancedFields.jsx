import React, { useContext } from 'react'
import { GeneticsContext } from '../../../context/genetics/GeneticsContext'
import { PlantEditionContext } from '../../../context/plants/PlantEditContext'

import { AddGeneticButton } from '../../Genetics/AddGeneticButton'

export function AdvancedFields() {
	const { genetics } = useContext(GeneticsContext)

	const { editedPlant, handlePlantChange, showAdvancedFields } =
		useContext(PlantEditionContext)

	if (!showAdvancedFields) return null

	return (
		<div className="advanced-fields">
			<label className="advanced-date">
				Fecha de ingreso:
				<input
					type="date"
					name="entryDate"
					value={editedPlant.entryDate}
					onChange={handlePlantChange}
					placeholder="Fecha de ingreso"
				/>
			</label>
			<label className="advanced-name">
				Nombre de la planta:
				<input
					type="text"
					name="name"
					value={editedPlant.name}
					onChange={handlePlantChange}
					placeholder="Nombre de la planta"
				/>
			</label>
			<div className="advanced-genetic">
				<label>
					Editar genética:
					<select name="genetic" onChange={handlePlantChange}>
						<option value={editedPlant.genetic}>Seleccione una genética</option>
						{genetics.map((genetic) => (
							<option key={genetic._id} value={genetic.name}>
								{genetic.name}
							</option>
						))}
					</select>
				</label>
				<AddGeneticButton />
			</div>
			<label className="advanced-change">
				Cambio estimado:
				<input
					type="date"
					name="estimatedChange"
					value={editedPlant.estimatedChange}
					onChange={handlePlantChange}
				/>
			</label>
		</div>
	)
}
