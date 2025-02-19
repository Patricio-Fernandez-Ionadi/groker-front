import React from 'react'
import { Button } from './Button'
import { useTheme } from '../../context/ThemeContext'

export const AlertModal = ({ message, onClose }) => {
	const { theme } = useTheme()

	return (
		<div className="modal-overlay">
			<div className={`modal-content ${theme}`}>
				<p>{message}</p>
				<Button className="confirm-button" onClick={onClose}>
					Confirmar
				</Button>
			</div>
		</div>
	)
}
