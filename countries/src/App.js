import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Row = ({ country, changeCountry }) =>
  <p>{country.name} <button onClick={() => changeCountry(country)}>show</button></p>

const Languages = ({languages}) =>
  <>
    <h3>languages</h3>
    <ul>
      {languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
  </>

const Country = ({ country }) => country === null
  ? ''
  : <div>
      <h2>{country.name}</h2>
      capital {country.capital}<br />
      population {country.population}<br />
      <Languages languages={country.languages} />
      <img src={country.flag} alt={`${country.name}'s flag`} width='200' />
    </div>


const App = () => {
  const [ searchKey, setSearchKey ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ selectedCountry, setSelectedCountry ] = useState(null)
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const changeCountry = (country) => setSelectedCountry(country)

  const showCountries = searchKey === ''
    ? []
    : countries.filter(country =>
      country.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
    )

  const handleSearchKeyChange = (event) => {
    setSelectedCountry(null)
    setSearchKey(event.target.value)
  }

  const message = () => showCountries.length > 10
    ? <p>Too many matches, specify another filter</p>
    : ''


  const rows = () => (showCountries.length <= 1 || showCountries.length >= 10)
    ? ''
    : showCountries.map(country => <Row key={country.name} country={country} changeCountry={changeCountry} />)
  
  const country = () => {
    if(selectedCountry !== null) {
      return <Country country={selectedCountry} />
    } else if(showCountries.length === 1) {
      return <Country country={showCountries[0]} />
    }
    return ''
  }

  return (
    <div>
      find countries <input value={searchKey} onChange={handleSearchKeyChange} />
      {message()}
      {rows()}
      {country()}
    </div>
  )
}

export default App
