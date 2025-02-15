import { useLocation } from 'react-router'

export function usePath() {
	const location = useLocation()

	return location.pathname
}
