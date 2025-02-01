import React from 'react'
import { toggleCheckboxState } from '../../../utils/helpers'

export function CommonFields({
	editedPlant,
	handlePlantChange,
	showAdvancedFields,
	setShowAdvancedFields,
	isWatered,
	setIsWatered,
	handleAddNote,
}) {
	return (
		<>
			<div>
				<label>
					Etapa:
					<select
						name="stage"
						value={editedPlant.stage}
						onChange={handlePlantChange}
					>
						<option value="vegetative">Vegetativo</option>
						<option value="flowering">Floración</option>
					</select>
				</label>

				<input
					type="text"
					name="potSize"
					onChange={handlePlantChange}
					placeholder="Tamaño de la maceta"
				/>
				<label>
					Temperatura (°C):
					<input
						type="number"
						name="temperature"
						onChange={handlePlantChange}
						placeholder="Temperatura (°C)"
					/>
				</label>
				<label>
					Humedad (%):
					<input
						type="number"
						name="humidity"
						onChange={handlePlantChange}
						placeholder="Humedad (%)"
					/>
				</label>
				<label>
					Maceta final
					<input
						type="checkbox"
						name="isFinalPot"
						onChange={handlePlantChange}
					/>
				</label>
				<label>
					Bajo observación
					<input
						type="checkbox"
						name="underObservation"
						onChange={handlePlantChange}
					/>
				</label>
				<label>
					¿Hubo riego?
					<input
						type="checkbox"
						checked={isWatered}
						onChange={() => toggleCheckboxState(isWatered, setIsWatered)}
					/>
				</label>
				<div>
					<div>
						<textarea
							name="note"
							onChange={handleAddNote}
							placeholder="Añadir una nota"
						/>
					</div>
				</div>
				<div>
					<button
						type="button"
						onClick={() =>
							toggleCheckboxState(showAdvancedFields, setShowAdvancedFields)
						}
					>
						{showAdvancedFields
							? 'Ocultar Campos Avanzados'
							: 'Mostrar Campos Avanzados'}
					</button>
				</div>
			</div>
		</>
	)
}
