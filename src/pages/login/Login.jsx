import { useState, useRef } from 'react'
import { useHistory, Link, Redirect } from 'react-router-dom'
import { Card, Container, Form, Button, Alert } from 'react-bootstrap'

import { useAuth} from '../../contexts/AuthContext'

const Login = () => {
	const { login, currentUser }  = useAuth()
	
	const history = useHistory()
	
	const [loading, setLoading] = useState(false)
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState('')
	
	const handleSumbit = async (e) => {
		e.preventDefault()
		try {
			setError('')
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			history.push('/')
		} catch (e) {
			setError(e.message)
			emailRef.current.value = null
			passwordRef.current.value = null
		}
		setLoading(false)
	}
	
	if (currentUser) {
		return <Redirect to='/' />
	}
	
	return (
		<Container>
			<Card className="">
				<Card.Body>
					{error && <Alert variant="danger">{error}</Alert>}
					<h3 className="mt-2 text-center mb-4">Login</h3>
					<Form onSubmit={(e) => handleSumbit(e)} className="py-4 w-100 mt-4">
						<Form.Label>Email address</Form.Label>
						<Form.Control ref={emailRef} className="w-100 mb-4" type="email" />
						<Form.Label>Password</Form.Label>
						<Form.Control ref={passwordRef} className="w-100 mb-4" type="password" />
						<Button disabled={loading} className="mt-3 w-100" type="submit">Login</Button>
					</Form>
					<Link>Forgot password ?</Link>
					<p>Don't have an account ? <Link className="pl-1" to='/signup'>Sign up</Link> </p>
				</Card.Body>
			</Card>
		</Container>
	)
}

export default Login