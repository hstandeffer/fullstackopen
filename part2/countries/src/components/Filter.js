import React from 'react'

const Filter = (props) => (
  <div>
    search countries <input onChange={props.handleSearch} />
  </div>
)

export default Filter