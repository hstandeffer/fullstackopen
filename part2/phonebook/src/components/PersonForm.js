import React from 'react'

const PersonForm = (props) => (
  <div>
    <form>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={props.addName}>add</button>
      </div>
    </form>
  </div>
)

export default PersonForm