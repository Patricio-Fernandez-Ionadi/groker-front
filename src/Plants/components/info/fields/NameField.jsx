import React from 'react'
import { TextInput, Button } from 'groker/components'
import { Cloud_arrow_up, Edit_icon } from 'groker/icons'

import { useTheme } from '@/app'
import { usePlantsActions, updateSimpleEvents } from '@/Plants'

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
					<TextInput
						label="Nombre"
						defaultValue={plant.name}
						name="name"
						ref={nameRef}
						theme={theme}
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
							theme={theme}
						>
							Cancelar
						</Button>
					</div>
				</div>
			) : (
				<div className="field-view-mode">
					<div>
						<h2>{plant.name}</h2>
					</div>
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
