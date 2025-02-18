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
		<>
			<h2>
				{state.name ? (
					<>
						<input
							type="text"
							name="name"
							defaultValue={plant.name}
							ref={nameRef}
							className={`text-input ${theme}`}
						/>
						<span>
							<Cloud_arrow_up size={iconSize} onEvent={handleNameEdition} />
						</span>
						<Button onEvent={() => update({ ...state, name: false })}>
							Cancelar
						</Button>
					</>
				) : (
					<>
						{plant.name}
						<span>
							<Edit_icon size={iconSize} onEvent={handleNameEdition} />
						</span>
					</>
				)}
			</h2>
		</>
	)
}
