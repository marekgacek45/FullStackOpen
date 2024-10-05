import React from 'react'

const Filter = ({ searchName, setSearchName }) => {
	return (
		<div>
			<label htmlFor='search'>Search</label>
			<input name='search' type='text' value={searchName} onChange={e => setSearchName(e.target.value)} />
		</div>
	)
}

export default Filter
