import React from 'react'

const Persons = ({persons,onDelete}) => {
  return (
    <ul>
    {persons.map(person => (
        <li key={person.name}>
            {person.name} {person.number} <button onClick={()=>onDelete(person.id)}>delete</button>
        </li>
    ))}
</ul>
  )
}

export default Persons