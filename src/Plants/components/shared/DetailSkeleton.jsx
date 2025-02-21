import React from 'react'
import { Skeleton, useTheme } from '@/app'

export function DetailSkeleton() {
	const { theme } = useTheme()
	return (
		<section className={`details-component ${theme}`}>
			<Skeleton width={'100%'} height={'200px'} />
		</section>
	)
}
