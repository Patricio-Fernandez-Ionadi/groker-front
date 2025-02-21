import React from 'react'
import { Skeleton, useTheme } from '../../../app'
import { DetailSkeleton } from '../shared/DetailSkeleton'

export function InventorySkeleton() {
	const { theme } = useTheme()
	return (
		<main>
			<section className={`inventory-component ${theme}`}>
				<div className={`inventory-table-container ${theme}`}>
					<Skeleton width={'100%'} height={'200px'} />
				</div>
				<DetailSkeleton />
			</section>
		</main>
	)
}
