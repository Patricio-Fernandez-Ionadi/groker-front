import { createRoot } from 'react-dom/client'

import CombinedProviders from './context/CombinedProviders'

import App from './app/App'

import './theme/index.css'

createRoot(document.getElementById('root')).render(
	<CombinedProviders>
		<App />
	</CombinedProviders>
)
