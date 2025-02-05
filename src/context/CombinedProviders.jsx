import React from 'react'
import { ProductsProvider } from './products/ProductsContext'
import { GeneticsProvider } from './genetics/GeneticsContext'
import GenModalProvider from './genetics/GenModalContext'
import { PlantsProvider } from './plants/PlantsContext'
import { FormProvider } from './FormContext'

const CombinedProviders = ({ children }) => {
	return (
		<ProductsProvider>
			<GeneticsProvider>
				<GenModalProvider>
					<PlantsProvider>
						<FormProvider>{children}</FormProvider>
					</PlantsProvider>
				</GenModalProvider>
			</GeneticsProvider>
		</ProductsProvider>
	)
}

export default CombinedProviders
