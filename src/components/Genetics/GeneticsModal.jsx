import React, { useContext } from 'react'

import { AddGenetic } from './AddGenetic'
import { GeneticList } from './GeneticList'
import { GenModalContext } from '../../context/genetics/GenModalContext'

export function GeneticsModal() {
	const { setShowGeneticForm } = useContext(GenModalContext)

	return (
		<div className="genetics-modal-overlay">
			<div className="genetics-modal">
				<button
					className="genetics-modal-close"
					onClick={() => setShowGeneticForm(false)}
				>
					X
				</button>
				<AddGenetic />
				<GeneticList />
			</div>
		</div>
	)
}
