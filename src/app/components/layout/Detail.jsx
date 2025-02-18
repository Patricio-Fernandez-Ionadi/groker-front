import React from 'react'
import { usePlants } from '../../../Plants/hooks/usePlants'

import { PlantDetails } from '../../../Plants/components/details/PlantDetails'
import { InventoryDetails } from '../../../Plants/components/inventory/InventoryDetails'

export const Detail = ({ theme }) => {
	const { selectedPlant } = usePlants()

	return (
		<section className={`details-component ${theme}`}>
			{selectedPlant ? <PlantDetails /> : <InventoryDetails />}
		</section>
	)
}
