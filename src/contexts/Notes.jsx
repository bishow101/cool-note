import { createContext, useContext, useReducer } from 'react'
import firebase from '../firebase'

import { notesReducer } from '../reducers/reducer'


export const NotesContext = createContext({
		currentNote: null,
		notes: [],
		filteredNotes: []
	}
)

export const NotesProvider = ({ children }) => {
	const initialState = useContext(NotesContext)
	const [state, dispatch] = useReducer(notesReducer, initialState)
	
	const getNotes = async (uid) => {
		const db = firebase.firestore()
		const data = await db.collection("notes").where('uid', '==', uid).get()
		dispatch({ type: 'SET_NOTES', payload: data.docs.map(doc => ({ ...doc.data(), id: doc.id })) })
	}
	
	const createNote = async (note) => {
		const db = firebase.firestore()
		const docRef = await db.collection("notes").add(note)
		dispatch({ type: 'CREATE_NOTE', payload: { ...note, id: docRef.id }})
	}
	
	const updateNote = async (note) => {
		const db = firebase.firestore()
		await db.collection("notes").doc(note.id).set({uid: note.uid, id: note.id, title: note.title, detail: note.detail, tags: note.tags })
		dispatch({ type: 'UPDATE_NOTE', payload: note })
	}
	
	const deleteNote = async (id) => {
		const db = firebase.firestore()
		await db.collection("notes").doc(id).delete()
		dispatch({ type: 'DELETE_NOTE', payload: id })
	}
	
	const searchNote = (query) => {
		dispatch({ type: 'SEARCH_NOTE', payload: query })
	}
	
	return (
		<NotesContext.Provider value={{ state, dispatch, getNotes, createNote, updateNote, deleteNote, searchNote }}>
			{ children }
		</NotesContext.Provider>
	)
}