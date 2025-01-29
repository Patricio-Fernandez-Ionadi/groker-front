export const samplePlants = [
	{
		id: '1',
		entryDate: '2023-01-01',
		name: 'Planta 1',
		genetic: 'Genética A',
		stage: 'Vegetativo',
		estimatedChange: '2023-02-01',
		lastWatered: '',
		potSize: '5L',
		isFinalPot: false,
		underObservation: false,
		history: [
			{ date: '2023-01-01', changes: ['Planta añadida'] },
			{ date: '2023-01-15', changes: ['Último riego: 2023-01-15'] },
		],
	},
	{
		id: '2',
		entryDate: '2023-01-05',
		name: 'Planta 2',
		genetic: 'Genética B',
		stage: 'Floracion',
		estimatedChange: '2023-03-01',
		lastWatered: '2023-01-20',
		potSize: '10L',
		isFinalPot: true,
		underObservation: true,
		history: [
			{ date: '2023-01-05', changes: ['Planta añadida'] },
			{ date: '2023-01-20', changes: ['Último riego: 2023-01-20'] },
		],
	},
]

export const sampleProducts = [
	{
		id: '1',
		name: 'Fertilizante A',
		stock: 1000,
		nitrogen: 6,
		phosphorus: 4,
		potassium: 5,
	},
	{
		id: '2',
		name: 'Fertilizante B',
		stock: 500,
		nitrogen: 8,
		phosphorus: 3,
		potassium: 7,
	},
]
