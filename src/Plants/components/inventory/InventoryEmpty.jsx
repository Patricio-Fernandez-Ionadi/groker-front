import React from 'react'
import { Exclamation_circle } from 'groker/icons'

export function InventoryEmpty({ children }) {
	return (
		<div className="inventory-empty">
			<Exclamation_circle size={40} color={'#007d85'} />
			<p>Vaya! parece que aun no hay plantas en el inventario</p>
			<p>Añade tu primer planta para comenzar !</p>

			{children}
		</div>
	)
}
