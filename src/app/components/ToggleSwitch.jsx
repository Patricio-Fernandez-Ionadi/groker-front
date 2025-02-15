import React from 'react'

export function ToggleSwitch({ switcher, onEvent, name }) {
	return (
		<div className="toggle-switch">
			<input
				type="checkbox"
				checked={switcher}
				onChange={onEvent}
				name={name}
			/>
			<span className="slider"></span>
		</div>
	)
}
