import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        setCountries(response.data)
      }, [])
  }) //empty array means it only runs on start, can add certain components to watch

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())
    if (event.target.value.length > 0) {
      setShow(true)
    }
    else {
      setShow(false)
    }
  }

  const countriesToShow = show
    ? countries.filter(country => country.name.toLowerCase().includes(search))
    : countries

  return (
    <div>
      <Filter handleSearch={handleSearch} />
      <Countries countriesToShow={countriesToShow} search={search} />
    </div>
  )
}

export default App