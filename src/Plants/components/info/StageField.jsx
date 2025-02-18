import React from 'react'
import { Button, Cloud_arrow_up, Edit_icon } from '../../../app'

import { usePlantsActions } from '../../hooks/usePlantsActions'

import { translateField } from '../../utils/translations'
import { formatDateToISO } from '../../utils/dateUtils'
import { updateSimpleEvents } from '../history/utils/updateHistory'

export const StageField = ({ edit, plant, iconSize }) => {
	const { state, update } = edit
	const { updatePlant } = usePlantsActions()

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

			const recalculateEstimatedChange = () => {
				const todayDate = new Date()

				let newChangeDate

				// Calcula la fecha estimada de cambio o corte de una planta segun la nueva etapa registrada
				if (newStage === 'vegetative') {
					newChangeDate = todayDate.setDate(todayDate.getDate() + 42) // 6 weeks
				} else if (newStage === 'flowering') {
					newChangeDate = todayDate.setDate(todayDate.getDate() + 56) // 8 weeks
				} else if (newStage === 'germination') {
					newChangeDate = todayDate.setDate(todayDate.getDate() + 28) // 4 weeks
				}

				return formatDateToISO(newChangeDate)
			}

			// Actualiza los datos de la planta
			let updatedBasePlant = {
				...plant,
				stage: newStage,
				estimatedChange: recalculateEstimatedChange(),
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
				recalculateEstimatedChange()
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
		<>
			Periodo:{' '}
			{state.stage ? (
				<select defaultValue={plant.stage} ref={stageRef}>
					<option value="germination">Germinación</option>
					<option value="vegetative">Vegetativo</option>
					<option value="flowering">Floración</option>
				</select>
			) : (
				<>{translateField(plant.stage)}</>
			)}
			{/* ACTIONS */}
			{state.stage ? (
				<>
					<Cloud_arrow_up onEvent={handleStageEdition} size={iconSize} />
					<Button onEvent={() => update({ ...state, stage: false })}>
						Cancelar
					</Button>
				</>
			) : (
				<Edit_icon onEvent={handleStageEdition} size={iconSize} />
			)}
		</>
	)
}
