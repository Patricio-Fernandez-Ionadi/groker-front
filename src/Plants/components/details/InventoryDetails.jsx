import React from 'react'
import { useStageCounter } from '../../hooks/useStageCounter'

export const InventoryDetails = () => {
	const stages = useStageCounter()

	return (
		<>
			<h2>Datos del inventario</h2>
			<p>Plantas en germinación: {stages.germination}</p>
			<p>Plantas en vegetativo: {stages.vegetative}</p>
			<p>Plantas en floración: {stages.flowering}</p>
			<p>
				Plantas totales:{' '}
				{stages.germination + stages.vegetative + stages.flowering}
			</p>
		</>
	)
}
