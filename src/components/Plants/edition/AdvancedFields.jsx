import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AddGeneticButton } from '../../Genetics/AddGeneticButton'
import {
	setEntryDate,
	setEstimatedChange,
	setGenetic,
	setName,
} from '../../../store/reducers/history/historySlice'

export function AdvancedFields() {
	const dispatch = useDispatch()

	const { genetics } = useSelector((state) => state.geneticsStore)
	const editingState = useSelector((state) => state.historyStore)

	const handleAdvancedChanges = (e) => {
		const { name, value } = e.target

		switch (name) {
			case 'entryDate':
				dispatch(setEntryDate(value))
				break
			case 'name':
				dispatch(setName(value))
				break
			case 'genetic':
				dispatch(setGenetic(value))
				break
			case 'estimatedChange':
				dispatch(setEstimatedChange(value))
				break
			default:
				console.log('por ahora no controlado', name)
		}
	}

	if (!editingState.showAdvanced) return null

	return (
		<div className="advanced-fields">
			<label className="advanced-date">
				Fecha de ingreso:
				<input
					type="date"
					name="entryDate"
					value={editingState.entryDate}
					onChange={handleAdvancedChanges}
					placeholder="Fecha de ingreso"
				/>
			</label>
			<label className="advanced-name">
				Nombre de la planta:
				<input
					type="text"
					name="name"
					value={editingState.name}
					onChange={handleAdvancedChanges}
					placeholder="Nombre de la planta"
				/>
			</label>
			<div className="advanced-genetic">
				<label>
					Editar genética:
					<select name="genetic" onChange={handleAdvancedChanges}>
						{genetics.map((genetic) => (
							<option key={genetic._id} value={genetic.name}>
								{genetic.name}
							</option>
						))}
					</select>
				</label>
				<AddGeneticButton />
			</div>
			<label className="advanced-change">
				Cambio estimado:
				<input
					type="date"
					name="estimatedChange"
					value={editingState.estimatedChange}
					onChange={handleAdvancedChanges}
				/>
			</label>
		</div>
	)
}
