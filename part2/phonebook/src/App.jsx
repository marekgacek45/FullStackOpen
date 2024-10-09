import { useEffect, useState } from 'react'
import personsService from './services/persons'

import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
	const [persons, setPersons] = useState([,])
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
			const personToUpdate = persons.find(person => person.name === nameObject.name)

			confirm(`${nameObject.name} already exists. Do you want to update the phone number?`) &&
				personsService.updatePerson(personToUpdate.id, nameObject).then(res => {
					setPersons(persons.map(person => (person.name === nameObject.name ? nameObject : person)))
					setNewName('')
					setNewNumber('')
				})
			return
		}

		personsService.createPerson(nameObject).then(res => {
			setPersons(persons.concat(nameObject))
			setNewName('')
			setNewNumber('')
		})
	}

	const deletePerson = id => {
		if (confirm('Are you sure you want to delete this person?')) {
			personsService.destroyPerson(id).then(res => {
				setPersons(persons.filter(person => person.id !== id))
			})
		}
	}

	const filterPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

	useEffect(() => {
		personsService.getAll().then(initialPersons => setPersons(initialPersons))
	}, [persons])

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
			<Persons persons={filterPersons} onDelete={deletePerson} />
		</div>
	)
}

export default App
