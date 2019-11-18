import React from 'react'

const Country = (props) => {
  const country = props.country
  
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li>{language.name}</li>
        ))}
      <div>
        <img alt="flag" height='200px' width='200px' src={country.flag}></img>
      </div>
      </ul>
    </div>
  )
}

export default Country