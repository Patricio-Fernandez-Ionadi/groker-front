import React from 'react'

/**
 * Componente para manejar los detalles de la planta.
 */
const PlantDetailsForm = ({ plantData, handleChange, showAdvancedFields }) => {
	return (
		<>
			{showAdvancedFields && (
				<div className="form-group">
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
				</div>
			)}
			<div className="form-group">
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
			</div>
		</>
	)
}

export default PlantDetailsForm
