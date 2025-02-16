import React from 'react'
import { Exlamation_cicle } from '../../../app'

export function InventoryEmpty({ children }) {
	return (
		<div className="inventory-empty">
			<Exlamation_cicle size={40} color={'#007d85'} />
			<p>Vaya! parece que aun no hay plantas en el inventario</p>
			<p>Añade tu primer planta para comenzar !</p>

			{children}
		</div>
	)
}
