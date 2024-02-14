import React from 'react'

export const Button = ({ onCli, id, icon }) => {
	return (
		<button onClick={onCli} id={id}>
			{icon}
		</button>
	)
}