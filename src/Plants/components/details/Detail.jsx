import React from 'react'
import { usePlants } from '../../hooks/usePlants'

import { PlantDetails } from './PlantDetails'
import { InventoryDetails } from './InventoryDetails'

export const Detail = () => {
	const { selectedPlant } = usePlants()

	return (
		<section className="details-component">
			{selectedPlant ? <PlantDetails /> : <InventoryDetails />}
		</section>
	)
}
