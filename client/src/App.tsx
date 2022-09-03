import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Heading, HeadingWithChildren } from './components/test-components/Heading'
import { Navbar } from './components/test-components/Navbar'
import { Container } from './components/test-components/Container'

function App() {
	const [response, setResponse]: [any, any] = useState({}) // for now

	const handleClick = async () => {
		try {
			const response = await fetch('http://localhost:8080/api/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: 'Test Task',
					detail: 'Make this thing work',
					priority: 2,
					why: 'cuz',
				}),
			})
			if (!response.ok) throw new Error('goofy mf')
			const data = await response.json()
			setResponse(data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='App'>
			<Navbar user={{ name: 'mas' }}></Navbar>
			<Heading title='Hello'></Heading>
			<HeadingWithChildren>Welcome to task app</HeadingWithChildren>
			<Container>Children </Container>
		</div>
	)
}

export default App
