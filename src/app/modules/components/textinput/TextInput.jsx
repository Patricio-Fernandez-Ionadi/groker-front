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
			<label className={`groker__textInput-label ${className} ${theme}`}>
				{label}
			</label>
			<input
				type={type}
				className={`groker__textInput-field ${theme}`}
				name={name}
				defaultValue={defaultValue}
				ref={ref}
				aria-labelledby={`${name ? name : 'input'}-field-label`}
			/>
		</>
	)
})
