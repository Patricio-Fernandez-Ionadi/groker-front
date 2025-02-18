import React from 'react'
import { useTheme } from '../../context/ThemeContext'

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
					<button className="cancel-button" onClick={onClose}>
						Cancelar
					</button>
					<button className="confirm-button" onClick={onConfirm}>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	)
}
