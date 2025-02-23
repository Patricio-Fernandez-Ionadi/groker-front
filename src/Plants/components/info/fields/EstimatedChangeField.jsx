import React from 'react'
import { Button, DateInput } from 'groker/components'
import {
	calendarFormat,
	inputsFormat,
	isoFormat,
	weeksUntil,
} from 'groker/date'
import { Cloud_arrow_up, Edit_icon } from 'groker/icons'

import { useTheme } from '@/app'

import { usePlantsActions, updateSimpleEvents } from '@/Plants'

export function EstimatedChangeField({ plant, edit, iconSize }) {
	const { updatePlant } = usePlantsActions()
	const { theme } = useTheme()
	const { state, update } = edit
	const [selectedDate, setSelectedDate] = React.useState(
		inputsFormat(plant.estimatedChange)
	)

	const handleEstimatedChangeEdition = () => {
		if (!state.estimatedChange) {
			update({ ...state, estimatedChange: true })
		} else {
			const newCahngeDate = isoFormat(selectedDate)

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

	const calculatedWeeks = weeksUntil(plant.estimatedChange)

	return (
		<section
			className="field-section"
			aria-labelledby="estimated-change-field-label"
		>
			{state.estimatedChange ? (
				<div className={`field-edit-mode ${theme}`}>
					<DateInput
						theme={theme}
						onChangeEvent={(e) => setSelectedDate(e.target.value)}
						iconSize={iconSize}
						label={
							plant.stage === 'flowering' ? 'Fecha de corte' : 'Cambio estimado'
						}
						className="groker-date"
						defaultValue={selectedDate}
					/>

					<div className="field-actions">
						<Cloud_arrow_up
							size={iconSize}
							onEvent={handleEstimatedChangeEdition}
							aria-label="Guardar cambio estimado"
						/>
						<Button
							onEvent={() => update({ ...state, estimatedChange: false })}
							aria-label="Cancelar edición"
							className="info-action-button"
							theme={theme}
						>
							Cancelar
						</Button>
					</div>
				</div>
			) : (
				<div className="field-view-mode">
					<div>
						<label className={`field-label ${theme}`}>
							{plant.stage === 'flowering'
								? 'Fecha de corte'
								: 'Cambio estimado'}
						</label>
						<span>
							{calendarFormat(plant.estimatedChange)} ({calculatedWeeks}{' '}
							semanas)
						</span>
					</div>
					<Edit_icon
						size={iconSize}
						onEvent={handleEstimatedChangeEdition}
						aria-label="Editar cambio estimado"
					/>
				</div>
			)}
		</section>
	)
}
