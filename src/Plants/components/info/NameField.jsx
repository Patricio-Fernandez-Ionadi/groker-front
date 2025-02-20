import React from 'react'
import { Button, Cloud_arrow_up, Edit_icon, useTheme } from '../../../app'

import { usePlantsActions } from '../../hooks/usePlantsActions'

import { updateSimpleEvents } from '../history/utils/updateHistory'

export const NameField = ({ edit, plant, iconSize }) => {
	const { updatePlant } = usePlantsActions()
	const { theme } = useTheme()
	const { state, update } = edit
	const nameRef = React.useRef(null)

	const handleNameEdition = () => {
		if (!state.name) {
			update({ ...state, name: true })
			setTimeout(() => {
				nameRef.current.focus()
				nameRef.current.select()
			}, 0)
		} else {
			let updatedPlant = { ...plant, name: nameRef.current.value }

			const updatedHistory = updateSimpleEvents(
				updatedPlant,
				'name',
				nameRef.current.value
			)

			const plantToSave = {
				...updatedPlant,
				history: updatedHistory,
			}

			updatePlant(plantToSave)
			update({ ...state, name: false })
		}
	}

	return (
		<section className="field-section" aria-labelledby="name-field-label">
			{state.name ? (
				<div className={`field-edit-mode ${theme}`}>
					<label className={`input-label ${theme}`}>Nombre</label>
					<input
						type="text"
						className={`input-field ${theme}`}
						name="name"
						defaultValue={plant.name}
						ref={nameRef}
						aria-labelledby="name-field-label"
					/>
					<div className="field-actions">
						<Cloud_arrow_up
							size={iconSize}
							onEvent={handleNameEdition}
							aria-label="Guardar nombre"
						/>
						<Button
							onEvent={() => update({ ...state, name: false })}
							aria-label="Cancelar edición"
							className="info-action-button"
						>
							Cancelar
						</Button>
					</div>
				</div>
			) : (
				<div className="field-view-mode">
					<h2>{plant.name}</h2>
					<Edit_icon
						size={iconSize}
						onEvent={handleNameEdition}
						aria-label="Editar nombre"
					/>
				</div>
			)}
		</section>
	)
}
