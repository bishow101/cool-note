const Drawer = ({ children, setOpen }) => {
	return (
		<div onClick={() => setOpen(open => !open)}className="drawer">
			{ children }
		</div>
	)
}

export default Drawer
