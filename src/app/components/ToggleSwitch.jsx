import React from 'react'

export const ToggleSwitch = ({ switcher, onEvent, name }) => {
	return (
		<label className="toggle-switch">
			<input
				type="checkbox"
				checked={switcher}
				onChange={onEvent}
				name={name}
			/>
			<span className="slider"></span>
		</label>
	)
}
