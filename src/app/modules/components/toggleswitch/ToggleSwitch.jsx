import React from 'react'

export const ToggleSwitch = ({ switcher, onEvent, name }) => {
	return (
		<label className="groker__toggle-switch">
			<input
				type="checkbox"
				checked={switcher}
				onChange={onEvent}
				name={name}
			/>
			<span className="groker__slider"></span>
		</label>
	)
}
