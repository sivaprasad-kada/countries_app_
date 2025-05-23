import { useState } from 'react'
import SearchBar from './SearchBar'
import SelectMenu from './SelectMenu'
import CountriesList from './CountriesList'
import { useTheme } from '../hooks/useTheme'
export default function Home() {
  const [query, setQuery] = useState('')
  const {dark,setDark} = useTheme();
  return (
    <main className={`${dark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu  setQuery = {setQuery}/>
      </div>
      { <CountriesList query={query} />}
    </main>
  )
}
