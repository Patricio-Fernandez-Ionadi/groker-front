import React from 'react'

export function AdvancedFields({ editedPlant, handlePlantChange, genetics }) {
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
