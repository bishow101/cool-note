import { useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { NotesProvider } from '../../contexts/Notes'
import { AuthProvider } from '../../contexts/AuthContext'
import Home from '../../pages/home'
import Edit from '../../pages/edit'
import SignUp from '../../pages/signup'
import Login from '../../pages/login'
import Profile from '../../pages/profile'

const App = () => {
	const [showEdit, setShowEdit] = useState(false)
	
	return (
		<Router>
			<Switch>
				<AuthProvider>
						<NotesProvider>
					<Route path='/' exact>
							{ showEdit ? <Edit setShowEdit={setShowEdit} /> : <Home setShowEdit={setShowEdit}/> }
					</Route>
				
						</NotesProvider>
					<Route path='/signup' component={SignUp} />
					<Route path='/login' component={Login} />
					<Route path='/profile' component={Profile} />
				</AuthProvider>
			</Switch>
		</Router>
	)
}

export default App
