import { useState, useEffect } from 'react'

const PREFIX = 'todo-app-'

const useLocalStorage = (key, initialValue) => {
	const prefixed_key = PREFIX + key
	
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(prefixed_key)
		if (storedValue) return JSON.parse(storedValue)
		if (typeof(initialValue) === 'function') return initialValue()
		return initialValue
	})
	
	useEffect(() => {
		localStorage.setItem(prefixed_key, JSON.stringify(value))
	}, [value, prefixed_key])
	
	return [value, setValue]
}

export default useLocalStorage