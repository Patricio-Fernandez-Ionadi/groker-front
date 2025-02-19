import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Button } from './Button'

export function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
	if (!isOpen) return null
	const { theme } = useTheme()

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div
				className={`modal-content ${theme}`}
				onClick={(e) => e.stopPropagation()}
			>
				<p>{message}</p>
				<div className="modal-actions">
					<Button className="confirm-button" onEvent={onConfirm}>
						Confirmar
					</Button>
					<Button className="cancel-button" onEvent={onClose}>
						Cancelar
					</Button>
				</div>
			</div>
		</div>
	)
}
