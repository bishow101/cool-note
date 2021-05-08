import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

import AppBar from '../../components/appbar'
import NoteList from '../../components/note_list'
import Drawer from '../../components/drawer'

import { NotesContext } from '../../contexts/Notes'
import { useAuth } from '../../contexts/AuthContext'


const Home = ({ setShowEdit }) => {
	const { currentUser } = useAuth()
	const {createNote, deleteNote} = useContext(NotesContext)
	
	const [open, setOpen] = useState(false)
	const [id, setId] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')
	
	const history = useHistory()
	
	const handleCreate = async () => {
		createNote({ uid: currentUser.uid, title: '', detail:'', tags: []})
		setShowEdit(true)
	}
	
	const handleDelete = async () => {
		await deleteNote(id)
		setOpen(open => !open)
	}
	
	const toogleDrawer = (e, noteId) => {
		e.stopPropagation()
		setOpen(open => !open)
		setId(noteId)
	}
	
	const MenuButton = () => {
		return <IconButton onClick={ () => console.log("menu clicked") }> <MenuIcon /> </IconButton>
	}
	
	const AccountButton = () => {
		return <IconButton onClick={ () => history.push('/profile') }> <AccountCircleIcon /> </IconButton>
	}
	
	const buttonStyle = {
		background: "#3a4447",
		width: "100%",
		padding: "0.5rem 0",
		color: "#fff",
		
	}
	
	const fabStyle = {
		position: "fixed",
		bottom: "10px",
		right: "10px",
	}
	
	if (!currentUser) {
		return (
			<Link style={{ color: "#fff" }} to="/signup">Sign up</Link>		
		)
	}
	
	return (
		<>
			<AppBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} StartButton={MenuButton} EndButton={AccountButton} />
			<h3>{currentUser.email}</h3>
			<NoteList searchQuery={searchQuery} toogleDrawer={toogleDrawer} setShowEdit={setShowEdit} />
			<Fab onClick={handleCreate} style={fabStyle}>
				<AddIcon />
			</Fab>
			{ open && 
				<Drawer setOpen={setOpen}>
					<div onClick={(e) => e.stopPropagation()} className={open ? "drawer-items active": "drawer-items"}>
						<Button onClick={(e) => handleDelete(e)} style={buttonStyle} startIcon={<DeleteIcon />}>Delete</Button>
					</div>
				</Drawer>
			}
		</>
	)
}

export default Home