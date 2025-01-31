import { createRoot } from 'react-dom/client'
import { PlantProvider } from './context/PlantContext'
import App from './app/App'

import './theme/index.css'
import { AppProvider } from './context/AppContext'

createRoot(document.getElementById('root')).render(
	<AppProvider>
		<PlantProvider>
			<App />
		</PlantProvider>
	</AppProvider>
)
