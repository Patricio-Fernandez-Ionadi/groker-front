export const routes = {
	home: { path: '/' },
	plants: { path: 'plants' },
	plantAdd: { path: 'ingreso' },
	products: { path: 'products' },
	plantDetail: { path: ':id', buildPath: (id) => `/plants/${id}` },
	minerales: { path: 'minerales' },
}
