import React from 'react'

const Numbers = (props) => (
  <div>
    <ul>
      {props.personsToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number} <button onClick={() => props.deleteName(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  </div>
)

export default Numbers