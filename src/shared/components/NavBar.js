import './navbar.css'

const NavBar = ({ children }) => {
	return (
		<nav className="nav-c">
			<div className="navbar-c">
				{children}
			</div>
		</nav>
	)
}

export default NavBar