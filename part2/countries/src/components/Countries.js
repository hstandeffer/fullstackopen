import React from 'react'
import Country from './Country'

const Countries = (props) => {

  const handleClick = (country) => (
    console.log(country.name)
  )

  if (props.search === '') {
    return <p>Input a country to see their info</p>
  }
  else if (props.countriesToShow.length > 10) {
    return <p>Too many results, increase input specification</p>
  }
  else if (props.countriesToShow.length > 1) {
    return (
      <div>
        <ul>
          {props.countriesToShow.map((country) => (
            <li key={country.name}>{country.name}
              <button onClick={(country) => handleClick(country)}>show</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  else {
    return (
     <div>
      <ul>
        {props.countriesToShow.map((country) => (
          <Country country={country} key={country.name} />
        ))}
      </ul>
      </div>
    )
  }
}

export default Countries