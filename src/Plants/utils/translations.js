export const translateField = (field) => {
	const translations = {
		name: 'Nombre',
		lastWatered: 'Último Riego',
		stage: 'Etapa',
		entryDate: 'Fecha de Ingreso',
		estimatedChange: 'Fecha Estimada de Cambio',
		underObservation: 'En Observación',
		history: 'Historial',
		genetics: 'Genética',
		potSize: 'Tamaño de la Maceta',
		isFinalPot: 'Maceta Final',
		flowering: 'Floración',
		vegetative: 'Vegetativo',
		germination: 'Germinación',
	}
	return translations[field] || field
}
