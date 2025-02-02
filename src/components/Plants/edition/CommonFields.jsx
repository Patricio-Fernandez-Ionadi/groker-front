import React from 'react'
import { toggleCheckboxState } from '../../../utils/helpers'
import { useEditPlantContext } from '../../../context/PlantEditContext'

export function CommonFields() {
	const {
		editedPlant,
		handlePlantChange,
		isWatered,
		setIsWatered,
		handleAddNote,
	} = useEditPlantContext()

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

				<input
					type="number"
					name="temperature"
					onChange={handlePlantChange}
					placeholder="Temperatura (°C)"
				/>

				<input
					type="number"
					name="humidity"
					onChange={handlePlantChange}
					placeholder="Humedad (%)"
				/>
				<label>
					Maceta final
					<input
						type="checkbox"
						name="isFinalPot"
						checked={editedPlant.flags.isFinalPot}
						onChange={handlePlantChange}
					/>
				</label>
				<label>
					Bajo observación
					<input
						type="checkbox"
						checked={editedPlant.flags.underObservation}
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
			</div>
		</>
	)
}
