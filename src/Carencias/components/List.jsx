import React from 'react'
export const List = ({ items }) => {
	return (
		<ul className="article_list">
			{items.map((item, index) => (
				<li className="article_list_item" key={index}>
					{item}
				</li>
			))}
		</ul>
	)
}
