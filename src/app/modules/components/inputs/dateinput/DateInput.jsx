import React from 'react'
import { Calendar_icon } from 'Groker/icons'

export const DateInput = React.forwardRef(function DateInput(props, ref) {
	const {
		theme,
		change,
		click,
		iconSize,
		defaultValue = '',
		label,
		toShowValue,
	} = props

	return (
		<>
			<label className={`groker__input-label ${theme}`}>{label}</label>
			<div className={`groker__input-field ${theme}`}>
				<input
					ref={ref}
					type="date"
					style={{
						opacity: 0,
						position: 'absolute',
						zIndex: -1,
					}}
					defaultValue={defaultValue}
					onChange={change}
				/>
				<input
					type="text"
					readOnly
					value={toShowValue}
					onClick={click}
					className="custom-date-input"
				/>
				<button
					className="custom-date-button"
					onClick={click}
					aria-label="Abrir selector de fecha"
				>
					<Calendar_icon size={iconSize} />
				</button>
			</div>
		</>
	)
})
