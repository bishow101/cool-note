import { useContext, useEffect } from 'react'

import NoteItem from './NoteItem'
import { NotesContext } from '../../contexts/Notes'
import { useAuth } from '../../contexts/AuthContext'

import './note_list.css'


const NoteList = ({ searchQuery, setShowEdit, toogleDrawer }) => {
	
	const {state, dispatch, getNotes, searchNote} = useContext(NotesContext)
	const { currentUser } = useAuth()
	
	useEffect(() => {
		if (currentUser) {
			getNotes(currentUser.uid)
		}
		//eslint-disable-next-line
	}, [currentUser])
	
	useEffect(() => {
		searchNote(searchQuery)
		//eslint-disable-next-line
	}, [searchQuery])
	
	return (
		<div className="note-list">
			{ state.filteredNotes && state.filteredNotes.map(note => <NoteItem toogleDrawer={toogleDrawer} setShowEdit={setShowEdit} key={note.id} dispatch={dispatch} note={note} />) }
		</div>
	)
}

export default NoteList
