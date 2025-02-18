import React from 'react'

import { usePlantsActions } from '../../hooks/usePlantsActions'

import { Button, Cloud_arrow_up, Edit_icon } from '../../../app'

import { updateSimpleEvents } from '../history/utils/updateHistory'

import {
	formatDate,
	formatDateToISO,
	formatDateToYYYYMMDD,
} from '../../utils/dateUtils'

export function EstimatedChangeField({ plant, edit, iconSize }) {
	const { updatePlant } = usePlantsActions()
	const changeRef = React.useRef(null)
	const { state, update } = edit

	const handleEstimatedChangeEdition = () => {
		if (!state.estimatedChange) {
			update({ ...state, estimatedChange: true })
		} else {
			const newCahngeDate = formatDateToISO(changeRef.current.value)

			let updatedPlant = { ...plant, estimatedChange: newCahngeDate }

			const updatedHistory = updateSimpleEvents(
				updatedPlant,
				'estimatedChange',
				newCahngeDate
			)

			const plantToSave = {
				...updatedPlant,
				history: updatedHistory,
			}

			updatePlant(plantToSave)

			update({ ...state, estimatedChange: false })
		}
	}

	const calculateWeeksUntilChange = (endDate) => {
		const start = new Date()
		const end = new Date(endDate)
		const diffInMs = end - start // Diferencia en milisegundos
		const msInWeek = 1000 * 60 * 60 * 24 * 7 // Milisegundos en una semana
		const weeks = diffInMs / msInWeek
		return Math.round(weeks) // Redondea hacia abajo para obtener semanas completas
	}
	const calculatedWeeks = calculateWeeksUntilChange(plant.estimatedChange)

	return (
		<>
			<p>
				{plant.stage === 'flowering' ? (
					<>Fecha de corte: </>
				) : (
					<>Cambio estimado: </>
				)}
				{state.estimatedChange ? (
					<>
						<input
							ref={changeRef}
							type="date"
							defaultValue={formatDateToYYYYMMDD(plant.estimatedChange)}
						/>

						<Cloud_arrow_up
							size={iconSize}
							onEvent={handleEstimatedChangeEdition}
						/>
						<Button
							onEvent={() => update({ ...state, estimatedChange: false })}
						>
							Cancelar
						</Button>
					</>
				) : (
					<>
						<span>
							{formatDate(plant.estimatedChange)} ({calculatedWeeks} semanas)
						</span>
						{/* {calculateWeeksUntilChange(plant.estimatedChange)} */}
						<span>
							<Edit_icon
								size={iconSize}
								onEvent={handleEstimatedChangeEdition}
							/>
						</span>
					</>
				)}
			</p>
		</>
	)
}
