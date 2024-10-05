import React from 'react'

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addNewName }) => {
	return (
		<form>
			<div>
				<label htmlFor='name'>Name</label>
				<input type='text' name='name' value={newName} onChange={e => setNewName(e.target.value)} />
			</div>
			<div>
				<label htmlFor='number'>Number</label>{' '}
				<input type='number' name='number' value={newNumber} onChange={e => setNewNumber(e.target.value)} />
			</div>
			<div>
				<button type='submit' onClick={addNewName}>
					add
				</button>
			</div>
		</form>
	)
}

export default PersonForm
