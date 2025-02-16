import React from 'react'

export function BurguerIcon({ toggle, onEvent }) {
	return (
		<div className="menu_icon" onClick={onEvent}>
			<div className={`bar${toggle ? ' toggle' : ''}`}></div>
		</div>
	)
}
