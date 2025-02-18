import React from 'react'
import { useGenetics } from '../../../Genetics'

import { Button, Cloud_arrow_up, Edit_icon } from '../../../app'
import { usePlantsActions } from '../../hooks/usePlantsActions'
import { updateSimpleEvents } from '../history/utils/updateHistory'

export const GeneticField = ({ edit, plant, iconSize }) => {
	const { genetics } = useGenetics()
	const { updatePlant } = usePlantsActions()
	const geneticRef = React.useRef(null)
	const { state, update } = edit

	const handleGeneticEdition = () => {
		let updatedPlant = null
		let updatedHistory = null

		if (!state.genetic) {
			update({ ...state, genetic: true })
		} else {
			const foundGenetic = genetics.find((genetic) => {
				return genetic.name === geneticRef.current?.value
			})

			if (foundGenetic) {
				updatedPlant = { ...plant, genetic: foundGenetic._id }
				updatedHistory = updateSimpleEvents(
					updatedPlant,
					'genetic',
					`${foundGenetic.name}`
				)
				const plantToSave = {
					...updatedPlant,
					history: updatedHistory,
				}
				updatePlant(plantToSave)
				update({ ...state, genetic: false })
			}
		}
	}

	return (
		<p>
			Genetica:{' '}
			{state.genetic ? (
				<>
					<select ref={geneticRef}>
						<option value="">Selecciona una genetica</option>
						{genetics.map((genetic) => (
							<option key={genetic._id} value={genetic.name}>
								{genetic.name}
							</option>
						))}
					</select>
					<span data="save-genetic" onClick={(e) => handleGeneticEdition(e)}>
						<Cloud_arrow_up size={iconSize} />
					</span>
					<span>
						<Button onEvent={() => update({ ...state, genetic: false })}>
							Cancelar
						</Button>
					</span>
				</>
			) : (
				<>
					{plant.genetic.name}
					<span>
						<Edit_icon
							size={iconSize}
							onEvent={(e) => handleGeneticEdition(e)}
						/>
					</span>
				</>
			)}
		</p>
	)
}
