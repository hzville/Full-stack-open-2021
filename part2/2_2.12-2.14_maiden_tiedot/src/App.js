import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

function App() {

  const [ searchValue, setNewSearchValue ] = useState('')
  const [ countries, setAllCountiresData ] = useState([])
  const filter_result = countries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))
  const name_list = countries.map(country => country.name.common)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => setAllCountiresData(response.data))
  },[])

  const handleSearchChange = (event) => {
    return(
      setNewSearchValue(event.target.value)
    )
  }

    return (
      <div>
        find countries <input value={searchValue} onChange={handleSearchChange}></input>
        
        {filter_result.length > 10 && searchValue !== '' &&
        
        <p>Too many matches, specify another filter</p>
        
        }

        {filter_result.length < 10 && filter_result.length > 1 &&
        
          <div>
          {filter_result.map(country => 
            <Country country={country} />
          )}
          </div>
        }
        
        {filter_result.length === 1 &&

          <div>
            <h1>
              {filter_result.map(country => 
              <Country country={country} />
              )} 
            </h1>
            <p>capital {filter_result[0].capital}</p>
            <p>region {filter_result[0].region}</p>
            <h2>languages</h2>
            <div>
            </div>
          </div>
        
        }

      </div>
      
    )
  //}
}

export default App;
