import React from 'react'
import { TextInput, Button } from 'groker/components'
import { Cloud_arrow_up, Edit_icon } from 'groker/icons'

import { useTheme } from '@/app'
import { usePlantsActions, updateSimpleEvents } from '@/Plants'

const setElementState = (name, state) => {
	setTimeout(() => {
		document.getElementsByName(name)[0][state]()
	}, 0)
}

export const NameField = ({ edit, plant, iconSize }) => {
	const { updatePlant } = usePlantsActions()
	const { theme } = useTheme()
	const { state, update } = edit
	const [name, setName] = React.useState(plant.name)

	const handleNameEdition = () => {
		if (!state.name) {
			update({ ...state, name: true })
			setElementState('name', 'focus')
			setElementState('name', 'select')
		} else {
			if (plant.name === name) return
			let updatedPlant = { ...plant, name }

			const updatedHistory = updateSimpleEvents(updatedPlant, 'name', name)

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
						defaultValue={name}
						name="name"
						theme={theme}
						onChangeEvent={(e) => setName(e.target.value)}
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
