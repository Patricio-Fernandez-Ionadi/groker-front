import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router'

import { Provider } from 'react-redux'
import { store } from './app/store/store'

import { CombinedProviders } from './app'
import { App } from './app/App'

import './theme/index.css'
import 'groker/dist/groker.css'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<CombinedProviders>
				<App />
			</CombinedProviders>
		</Provider>
	</BrowserRouter>
)
