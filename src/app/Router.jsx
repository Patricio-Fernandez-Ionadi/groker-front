import React from 'react'
import { Routes, Route } from 'react-router'
import { App } from './App'

export const Router = () => {
	return (
		<Routes>
			<Route index element={<App />} />
		</Routes>
	)
}
