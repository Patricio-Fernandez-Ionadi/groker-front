import React from 'react'
import { Button } from 'Groker/components'
import { toNormal, toYYYYMMDD, toISO } from 'Groker/date'

import { Calendar_icon, Cloud_arrow_up, Edit_icon } from 'Groker/icons'
import { useTheme } from '@/app'

import { usePlantsActions, updateSimpleEvents } from '@/Plants'

export function EstimatedChangeField({ plant, edit, iconSize }) {
	const { updatePlant } = usePlantsActions()
	const changeRef = React.useRef(null)
	const { theme } = useTheme()
	const { state, update } = edit
	const [selectedDate, setSelectedDate] = React.useState(
		toYYYYMMDD(plant.estimatedChange)
	)

	const handleEstimatedChangeEdition = () => {
		if (!state.estimatedChange) {
			update({ ...state, estimatedChange: true })
		} else {
			const newCahngeDate = toISO(changeRef.current.value)

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
		<section
			className="field-section"
			aria-labelledby="estimated-change-field-label"
		>
			{state.estimatedChange ? (
				<div className={`field-edit-mode ${theme}`}>
					<label className={`input-label ${theme}`}>
						{plant.stage === 'flowering' ? 'Fecha de corte' : 'Cambio estimado'}
					</label>
					<div className={`input-field ${theme}`}>
						<input
							ref={changeRef}
							type="date"
							style={{
								opacity: 0,
								position: 'absolute',
								zIndex: -1,
							}}
							defaultValue={selectedDate}
							onChange={(e) => {
								setSelectedDate(e.target.value)
							}}
						/>
						<input
							type="text"
							readOnly
							value={toNormal(selectedDate)}
							onClick={() => changeRef.current.showPicker()}
							className="custom-date-input"
						/>
						<button
							className="custom-date-button"
							onClick={() => changeRef.current.showPicker()}
							aria-label="Abrir selector de fecha"
						>
							<Calendar_icon size={iconSize} />
						</button>
					</div>
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
							{toNormal(plant.estimatedChange)} ({calculatedWeeks} semanas)
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
