import React, { useContext, useEffect } from 'react'

import { AddGenetic } from './AddGenetic'
import { GeneticList } from './GeneticList'
import { GenModalContext } from '../index'

export function GeneticsModal() {
	const { closeGeneticModal, isGeneticModalOpen } = useContext(GenModalContext)

	useEffect(() => {
		if (isGeneticModalOpen) {
			document.body.style.overflow = 'hidden' // Deshabilita el scroll
		} else {
			document.body.style.overflow = '' // Habilita el scroll nuevamente
		}

		// Limpieza al desmontar el componente
		return () => {
			document.body.style.overflow = ''
		}
	}, [isGeneticModalOpen])

	if (!isGeneticModalOpen) return null

	return (
		<div className="genetics-modal-overlay" onClick={closeGeneticModal}>
			<div className="genetics-modal" onClick={(e) => e.stopPropagation()}>
				<button className="genetics-modal-close" onClick={closeGeneticModal}>
					✖
				</button>
				<h2 className="genetics-modal-title">Gestión de Genética</h2>

				<AddGenetic />
				<GeneticList />
			</div>
		</div>
	)
}
