import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      capital {country.capital}<br />
      population {country.population}<br />
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`${country.name}'s flag`} width='200' />
    </div>
  )
}

const App = () => {
  const [ searchKey, setSearchKey ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const showCountries = searchKey === ''
    ? []
    : countries.filter(country =>
      country.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
    )

  const handleSearchKeyChange = (event) => {
    setSearchKey(event.target.value)
  }

  const message = () => {
    return showCountries.length > 10
      ? <p>Too many matches, specify another filter</p>
      : ''
  }

  const rows = () => {
    return showCountries.length > 2 && showCountries.length <= 10
      ? showCountries.map(country => <p key={country.name}>{country.name}</p>)
      : ''
  }

  const country = () => {
    return showCountries.length === 1
      ? <Country country={showCountries[0]} />
      : ''
  }

  return (
    <div>
      find countries <input value={searchKey} onChange={handleSearchKeyChange} />
      <div>
        {message()}
        {rows()}
        {country()}
      </div>
    </div>
  );
}

export default App
