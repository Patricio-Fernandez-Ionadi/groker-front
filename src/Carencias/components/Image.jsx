import React from 'react'
export const Image = ({ title, src }) => {
	return (
		<picture>
			<h3 className="article_title">{title}</h3>{' '}
			<img className="article_img" src={src} alt={title} />
		</picture>
	)
}
