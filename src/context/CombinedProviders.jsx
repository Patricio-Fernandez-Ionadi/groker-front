import React from 'react'
import GenModalProvider from './genetics/GenModalContext'
import { FormProvider } from './FormContext'

const CombinedProviders = ({ children }) => {
	return (
		<GenModalProvider>
			<FormProvider>{children}</FormProvider>
		</GenModalProvider>
	)
}

export default CombinedProviders
