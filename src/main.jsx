import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store'

import CombinedProviders from './context/CombinedProviders'
import { Router } from './app/Router'

import './theme/index.css'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<CombinedProviders>
				<Router />
			</CombinedProviders>
		</Provider>
	</BrowserRouter>
)
