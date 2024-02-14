import React from 'react'

export const Input = ({ id, val, plh, oncha }) => {
	return (
		<input
			type="text"
			id={id}
			value={val}
			placeholder={plh}
			onChange={oncha}
		></input>
	)
}