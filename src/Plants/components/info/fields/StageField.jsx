import React from 'react'
import { Button, Cloud_arrow_up, Edit_icon, useTheme } from '../../../../app'

import { usePlantsActions } from '../../../hooks/usePlantsActions'

import { translateField } from '../../../utils/translations'
import { culateEstimatedChangeFromNow } from '../../../utils/dateUtils'
import { updateSimpleEvents } from '../../history/utils/updateHistory'

export const StageField = ({ edit, plant, iconSize }) => {
	const { state, update } = edit
	const { updatePlant } = usePlantsActions()
	const { theme } = useTheme()

	const stageRef = React.useRef(null)

	const handleStageEdition = () => {
		if (!state.stage) {
			update({ ...state, stage: true })
		} else {
			const newStage = stageRef.current.value

			if (plant.stage === newStage) {
				update({ ...state, stage: false })
				return
			}

			// Actualiza los datos de la planta
			let updatedBasePlant = {
				...plant,
				stage: newStage,
				estimatedChange: culateEstimatedChangeFromNow(newStage),
			}

			// Actualiza el historial con el evento stage
			let updateStageEvent = updateSimpleEvents(
				updatedBasePlant,
				'stage',
				newStage
			)

			// Copia de la planta con el nuevo historial (stage)
			const updatedPlantHistoryStage = {
				...updatedBasePlant,
				history: updateStageEvent,
			}

			// Actualiza el historial con el evento estimatedChange
			const updateChangeEvent = updateSimpleEvents(
				updatedPlantHistoryStage,
				'estimatedChange',
				culateEstimatedChangeFromNow(newStage)
			)

			// Resultado de la planta con el nuevo historial (ambos eventos stage y estimatedChange)
			const plantToSave = {
				...updatedPlantHistoryStage,
				history: updateChangeEvent,
			}
			updatePlant(plantToSave)
			update({ ...state, stage: false })
		}
	}

	return (
		<section className="field-section" aria-labelledby="stage-field-label">
			{state.stage ? (
				<div className={`field-edit-mode ${theme}`}>
					<label className={`input-label ${theme}`}>Periodo</label>
					<select
						defaultValue={plant.stage}
						ref={stageRef}
						aria-labelledby="stage-field-label"
						className={`input-field ${theme}`}
					>
						<option value="germination">Germinación</option>
						<option value="vegetative">Vegetativo</option>
						<option value="flowering">Floración</option>
					</select>
					<div className="field-actions">
						<Cloud_arrow_up
							size={iconSize}
							onEvent={handleStageEdition}
							aria-label="Guardar periodo"
						/>
						<Button
							onEvent={() => update({ ...state, stage: false })}
							aria-label="Cancelar edición"
							className="info-action-button"
						>
							Cancelar
						</Button>
					</div>
				</div>
			) : (
				<div className="field-view-mode">
					<div>
						<label className="field-label">Periodo</label>
						<span>{translateField(plant.stage)}</span>
					</div>
					<Edit_icon
						size={iconSize}
						onEvent={handleStageEdition}
						aria-label="Editar periodo"
					/>
				</div>
			)}
		</section>
	)
}
