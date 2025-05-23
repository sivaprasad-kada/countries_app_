import React from 'react'

export default function SelectMenu({setQuery}) {
  return (
    <select className="filter-by-region" onClick={(e)=>{
      setQuery(e.target.value.toLowerCase());
    }}>
      <option hidden>FilterCountries</option>
      <option value="">All</option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  )
}
