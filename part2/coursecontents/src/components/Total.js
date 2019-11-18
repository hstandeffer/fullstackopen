import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((tot, current) => (
    tot + current.exercises
  ), 0)

  return <p><strong>Total of {total} exercises</strong></p>
}

export default Total