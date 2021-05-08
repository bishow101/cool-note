import { useHistory, Redirect } from 'react-router-dom'
import { Card, Container, Button } from 'react-bootstrap'

import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'

import { useAuth } from '../../contexts/AuthContext'

const Profile = () => {
	const { currentUser, logout } = useAuth()
	const history = useHistory()
	
	const handleLogout = async () => {
		try {
			await logout()
			history.push('/login')
		} catch (e) {
			alert(e.message)
		}
	}
	
	if (!currentUser) {
		return <Redirect to="/login" />
	}
	
	return (
		<Container>
			<Card className="py-0">
				<Card.Body className="px-0 py-0">
				<IconButton className="text-left p0" onClick= {() => history.push('/')}> <BackIcon /> </IconButton>
					<h5 className="mt-2 text-center mb-4">Email: {currentUser.email}</h5>
				</Card.Body>
				<Button className="text-right" onClick={handleLogout}>Logout</Button>
			</Card>
		</Container>
	)
}

export default Profile
