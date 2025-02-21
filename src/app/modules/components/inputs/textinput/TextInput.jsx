import React from 'react'

export const TextInput = React.forwardRef(function TextInput(props, ref) {
	const {
		label,
		defaultValue = '',
		name,
		type = 'text',
		className = '',
		theme,
	} = props

	return (
		<>
			<label className={`groker__input-label ${className} ${theme}`}>
				{label}
			</label>
			<input
				type={type}
				className={`groker__input-field ${theme}`}
				name={name}
				defaultValue={defaultValue}
				ref={ref}
				aria-labelledby={`${name ? name : 'input'}-field-label`}
			/>
		</>
	)
})
