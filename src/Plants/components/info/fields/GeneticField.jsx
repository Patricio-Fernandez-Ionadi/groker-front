import React from 'react'
import { useGenetics } from '../../../../Genetics'

import { Button, Cloud_arrow_up, Edit_icon, useTheme } from '../../../../app'
import { usePlantsActions } from '../../../hooks/usePlantsActions'
import { updateSimpleEvents } from '../../history/utils/updateHistory'

export const GeneticField = ({ edit, plant, iconSize }) => {
	const { genetics } = useGenetics()
	const { updatePlant } = usePlantsActions()
	const { theme } = useTheme()
	const { state, update } = edit
	const geneticRef = React.useRef(null)

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
		<section className="field-section" aria-labelledby="genetic-field-label">
			{state.genetic ? (
				<div className={`field-edit-mode ${theme}`}>
					<label className={`input-label ${theme}`}>Genética</label>
					<select
						ref={geneticRef}
						className={`input-field ${theme}`}
						aria-labelledby="genetic-field-label"
					>
						<option value="">Selecciona una genética</option>
						{genetics.map((genetic) => (
							<option key={genetic._id} value={genetic.name}>
								{genetic.name}
							</option>
						))}
					</select>
					<div
						className="field-actions"
						data="save-genetic"
						onClick={(e) => handleGeneticEdition(e)}
					>
						<Cloud_arrow_up size={iconSize} aria-label="Guardar genética" />
						<Button
							onEvent={() => update({ ...state, genetic: false })}
							aria-label="Cancelar edición"
							className="info-action-button"
						>
							Cancelar
						</Button>
					</div>
				</div>
			) : (
				<>
					<div className="field-view-mode">
						<div>
							<label className="field-label">Genética</label>
							<span>{plant.genetic.name}</span>
						</div>
						<Edit_icon
							size={iconSize}
							onEvent={(e) => handleGeneticEdition(e)}
							aria-label="Editar genética"
						/>
					</div>
				</>
			)}
		</section>
	)
}
