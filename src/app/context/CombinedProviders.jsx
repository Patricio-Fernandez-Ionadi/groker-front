import React from 'react'
import { GenModalProvider } from '../../Genetics'
import { FormProvider } from './FormContext'

export const CombinedProviders = ({ children }) => {
	return (
		<GenModalProvider>
			<FormProvider>{children}</FormProvider>
		</GenModalProvider>
	)
}
