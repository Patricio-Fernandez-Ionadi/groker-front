import React from 'react'

import { ThemeProvider } from './ThemeContext'
import { GenModalProvider } from '../../Genetics'
import { FormProvider } from './FormContext'

export const CombinedProviders = ({ children }) => {
	return (
		<ThemeProvider>
			<GenModalProvider>
				<FormProvider>{children}</FormProvider>
			</GenModalProvider>
		</ThemeProvider>
	)
}
