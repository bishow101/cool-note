import { useState, useReducer, createContext, useContext, useEffect } from 'react'
import { auth } from '../firebase'

import { notesReducer } from '../reducers/reducer'
const AuthContext = createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState()
	const [signing, setSigning] = useState(true)
	//eslint-disable-next-line
	const [state, dispatch] = useReducer(notesReducer)
	
	const signup = async (email, password) => {
		return await auth.createUserWithEmailAndPassword(email, password)
	}
	
	const login = async (email, password) => {
		return await auth.signInWithEmailAndPassword(email, password)
	}

	const logout = async () => {
		return await auth.signOut()
	}
	
	useEffect(() => {
		
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (!user) dispatch({ type: 'SET_NOTES', payload:[] })
			setCurrentUser(user)
			setSigning(false)
		})
		
		return unsubscribe
	}, [])
	
	return (
		<AuthContext.Provider value={ {currentUser, signup, login, logout} }>
			{ !signing && children }
		</AuthContext.Provider>
	)
}