import React, { useEffect, useState, useCallback } from 'react'
import { Chevron_left } from 'groker/icons'

export const GoTopButton = () => {
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (document.scrollingElement.scrollTop > 300) {
				setIsActive(true)
			} else {
				setIsActive(false)
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = useCallback((duration) => {
		if (document.scrollingElement.scrollTop === 0) return

		const totalScrollDistance = document.scrollingElement.scrollTop
		let scrollY = totalScrollDistance
		let oldTimestamp = null

		function step(newTimestamp) {
			if (oldTimestamp !== null) {
				scrollY -=
					(totalScrollDistance * (newTimestamp - oldTimestamp)) / duration
				if (scrollY <= 0) return (document.scrollingElement.scrollTop = 0)
				document.scrollingElement.scrollTop = scrollY
			}
			oldTimestamp = newTimestamp
			window.requestAnimationFrame(step)
		}
		window.requestAnimationFrame(step)
	}, [])
	const handleGoTop = () => {
		scrollToTop(500)
	}

	return (
		<>
			{isActive ? (
				<button onClick={handleGoTop} className="go-top-button">
					<Chevron_left size={28}/>
				</button>
			) : (
				<span></span>
			)}
		</>
	)
}
