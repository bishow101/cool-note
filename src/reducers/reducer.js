export const notesReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTES':
			return {
				...state,
				notes: action.payload,
				filteredNotes: action.payload
			}
		
		case 'CREATE_NOTE':
			return { 
				...state,
				currentNote: action.payload,
				notes: [...state.notes, action.payload],
				filteredNotes: [...state.notes, action.payload]
			}
		
		case 'EDIT_NOTE':
			return {
				...state,
				currentNote: action.payload
			}
		
		case 'UPDATE_NOTE':
			const updatedNote = action.payload
			const updatedNoteIndex = state.notes.indexOf(state.notes.find(note => note.id === updatedNote.id))
			const a = state.notes.slice(0, updatedNoteIndex)
			const b = state.notes.slice(updatedNoteIndex + 1)
			
			return {
				...state,
				currentNote: null,
				notes: [...a, updatedNote, ...b],
				filteredNotes: [...a,  updatedNote, ...b]
			}
		
		case 'DELETE_NOTE':
			const prevNotes = state.notes
			const newNotes = prevNotes.filter(note => note.id !== action.payload)
			
			return {
				...state,
				notes: [...newNotes],
				filteredNotes: [...newNotes]
			}
		
		case 'SEARCH_NOTE':
			if (action.payload.trim() === '') {
				return {
					...state,
					filteredNotes: state.notes
				}
			}
			
			const matchLetter = (firstWord, secondWord) => {
				for (var i = 0; i < firstWord.length; i++) {
					for (var j = 0; j < secondWord.length; j++) {
						if (firstWord[i] === secondWord[j]) return true 
					}
				}
				return false
			}
			
			const matchWord = (firstWords, secondWords) => {
				for (var i = 0; i < firstWords.length; i++) {
					for (var j = 0; j < secondWords.length; j++) {
						if (firstWords[i] === secondWords[j] || (matchLetter(firstWords[i], secondWords[j]))) return true 
					}
				}
				return false
			}
			
			const filteredNotes = state.notes.filter(note => {
					const ts = note.title.toLowerCase().split(' ') //(action.payload.toLowerCase()) || note.detail.toLowerCase() === action.payload.toLowerCase()
					const ds = note.detail.toLowerCase().split(' ')
					const qs = action.payload.toLowerCase().split(' ')
					const foundTitle = matchWord(ts, qs)
					const foundDetail = matchWord(ds, qs)
					
					return foundDetail || foundTitle
			})
			return {
				...state,
				filteredNotes: filteredNotes
			}
		default:
			return state
	}
}