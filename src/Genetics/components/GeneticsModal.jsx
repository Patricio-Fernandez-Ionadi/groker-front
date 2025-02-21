import React, { useContext, useEffect } from 'react'
import { Button } from 'Groker/components'
import { useTheme } from '../../app/context/ThemeContext'

import { AddGenetic } from './AddGenetic'
import { GeneticList } from './GeneticList'
import { GenModalContext } from '../index'

export function GeneticsModal() {
	const { closeGeneticModal, isGeneticModalOpen } = useContext(GenModalContext)
	const { theme } = useTheme()

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
		<div className="modal-overlay" onClick={closeGeneticModal}>
			<div
				className={`genetics-modal modal-content ${theme}`}
				onClick={(e) => e.stopPropagation()}
			>
				<Button
					className="genetics-modal-close"
					onEvent={closeGeneticModal}
					theme={theme}
				>
					✖
				</Button>
				<h2 className="genetics-modal-title" theme={theme}>
					Gestión de Genética
				</h2>

				<AddGenetic />
				<GeneticList />
			</div>
		</div>
	)
}
