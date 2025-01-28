import { createRoot } from 'react-dom/client'
import App from './app/App'
import { PlantProvider } from './context/PlantContext'

createRoot(document.getElementById('root')).render(
	<PlantProvider>
		<App />
	</PlantProvider>
)
