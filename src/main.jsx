import { createRoot } from 'react-dom/client'
import { AppProvider } from './context/AppContext'
import { FormProvider } from './context/FormContext'
import GenModalProvider from './context/genetics/GenModalContext'

import App from './app/App'

import './theme/index.css'

createRoot(document.getElementById('root')).render(
	<AppProvider>
		<GenModalProvider>
			<FormProvider>
				<App />
			</FormProvider>
		</GenModalProvider>
	</AppProvider>
)
