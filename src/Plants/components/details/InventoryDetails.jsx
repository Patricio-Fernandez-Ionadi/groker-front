import React from 'react'
import { useStageCounter } from '../../hooks/useStageCounter'

export const InventoryDetails = () => {
	const stages = useStageCounter()

	return (
		<>
			<h2>Datos del inventario</h2>
			<p>Plantas en germinación: {stages.germination}</p>
			<p>Plantas vegetativas: {stages.vegetative}</p>
			<p>Plantas en floración: {stages.flowering}</p>
			<p>
				Total de plantas:{' '}
				{stages.germination + stages.vegetative + stages.flowering}
			</p>
		</>
	)
}
