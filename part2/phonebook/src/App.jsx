import { useState } from 'react'

import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [searchName, setSearchName] = useState('')

	const addNewName = e => {
		e.preventDefault()
		const nameObject = {
			name: newName,
			number: newNumber,
		}

		if (persons.some(person => person.name === nameObject.name)) {
			alert(`${newName} is already in the phonebook`)
			return
		}

		setPersons(persons.concat(nameObject))
		setNewName('')
		setNewNumber('')
	}

	const filterPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter searchName={searchName} setSearchName={setSearchName} />
			<h3>add a new</h3>
			<PersonForm
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				addNewName={addNewName}
			/>
			<h3>Numbers</h3>
			<Persons persons={filterPersons} />
		</div>
	)
}

export default App
