import React from 'react'

import { Navigation } from './navigation/Navigation'

export function Header() {
	return (
		<header className="header">
			<Navigation />
			{/* 
			{location.state || currentPath !== '/' ? (
				<div className="back-button">
					<BackButton />
				</div>
			) : (
				''
			)}
			<div className="header-buttons">
				{currentPath !== '/products' && (
					<button>
						<Link to="/products" state={{ from: location.pathname }}>
							Inventario de Productos
						</Link>
					</button>
				)}
			</div> */}
		</header>
	)
}
