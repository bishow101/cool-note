import { useState, useContext } from 'react'

import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import MoreIcon from '@material-ui/icons/MoreVert'

import { NotesContext } from '../../contexts/Notes'
import AppBar from '../../components/appbar'

import './edit_note.css'

const Edit = ({ setShowEdit }) => {
	const {state, updateNote, deleteNote} = useContext(NotesContext)
	const { currentNote } = state
	
	const [title, setTitle] = useState(currentNote ? currentNote.title : '')
	const [detail, setDetail] = useState(currentNote ? currentNote.detail : '')
	
	const handleUpdate = async () => {
		if (title.trim() === '' && detail.trim() === '') {
			deleteNote(currentNote.id)
			setShowEdit(false)
			return
		}
		const updatedNote = {
			...currentNote,
			id: currentNote.id,
			title: title,
			detail: detail,
			tags: currentNote.tags
		}
		await updateNote(updatedNote)
		setShowEdit(false)
	}
	
	const BackButton = () => {
		return <IconButton onClick= {handleUpdate}> <BackIcon /> </IconButton>
	}
	
	const MoreButton = () => {
		return <IconButton> <MoreIcon /> </IconButton>
	}
	
	return  (
		<>
			<AppBar StartButton={BackButton} EndButton={MoreButton} />
			<div className="container">
				<form onSubmit={handleUpdate} className="note-info">
					<input onChange={(e) => setTitle(e.target.value)} type="text" value={title} className="title" placeholder="Title" />
					<textarea onChange={(e) => setDetail(e.target.value)} type="text" value={detail} className="info detail-text" placeholder="Note" />
				</form>
			</div>
		</>
	)
}

export default Edit
