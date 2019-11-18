import React from 'react'

const Filter = (props) => (
  <div>
    search: <input onChange={props.handleSearch} />
  </div>
)

export default Filter