import { createRoot } from 'react-dom/client'
import { PlantProvider } from './context/PlantContext'
import App from './app/App'

import './theme/index.css'

createRoot(document.getElementById('root')).render(
	<PlantProvider>
		<App />
	</PlantProvider>
)
