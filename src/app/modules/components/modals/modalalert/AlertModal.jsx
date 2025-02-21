import React from 'react'
import { Button } from 'Groker/components'

export const AlertModal = ({ message, onClose, theme = 'light' }) => {
	return (
		<div className="modal-overlay">
			<div className={`modal-content ${theme}`}>
				<p>{message}</p>
				<Button className="confirm-button" onEvent={onClose}>
					Confirmar
				</Button>
			</div>
		</div>
	)
}
