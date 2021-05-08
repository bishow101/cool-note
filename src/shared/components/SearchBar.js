import { useRef } from 'react'
import './searchBar.css'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
	const inputEl = useRef()
	
	return (
		<input ref={inputEl} value={searchQuery} onChange={() => setSearchQuery(inputEl.current.value)} type="search" placeholder="Search notes" className="search-field" />
	)
}

export default SearchBar