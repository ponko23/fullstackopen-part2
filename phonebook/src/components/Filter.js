import React from 'react'

const Filter = ({searchKey, handleSearchKeyChange}) => 
  <p>filter show with <input value={searchKey} onChange={handleSearchKeyChange} /></p>

export default Filter