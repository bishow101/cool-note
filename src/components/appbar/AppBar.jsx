import { NavBar, SearchBar } from '../../shared/components'

const AppBar = ({ setSearchQuery, searchQuery, StartButton, EndButton }) => {
	return (
		<NavBar>
			{ StartButton && <StartButton /> }
			<SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
			{ EndButton && <EndButton /> }
		</NavBar>
	)
}

export default AppBar
