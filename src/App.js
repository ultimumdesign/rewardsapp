import jwt_decode from 'jwt-decode'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

import fetch from 'node-fetch'

import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Routes, Route } from 'react-router-dom'

import LoginButton from './components/loginButton'
import LogoutButton from './components/logoutButton'

import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [readMembersScope, setReadMembersScope] = useState(false)

  useEffect(() => {
    const getUserNavPerm = async () => {
      try {
        const accessToken = await getAccessTokenSilently()

        console.log(jwt_decode(accessToken))

        setReadMembersScope(true)
      } catch (e) {
        console.log(e.message)
      }
    }

    getUserNavPerm()
  }, [getAccessTokenSilently, user?.sub])

  return (
    <Container fluid>
      <Navbar bg='light' expand='lg'>
        <LinkContainer to='/'>
          <Navbar.Brand>Smokey Warez Rewards</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {readMembersScope &&
              <LinkContainer to='members'>
                <Nav.Link>Members</Nav.Link>
              </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          {isAuthenticated
            ? <LogoutButton />
            : <LoginButton />}
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='members' element={<Members />} />
      </Routes>
    </Container>
  )
}

// App.js
function Home () {
  return (
    <main>
      <h2>Welcome!</h2>
      <Profile />
    </main>
  )
}

function Profile () {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    isAuthenticated
      ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{JSON.stringify(user)}</p>
        </div>
        )
      : (
        <div>
          <p>Please login to continue</p>
        </div>
        )
  )
}

function Members () {
  const { user, getAccessTokenSilently } = useAuth0()
  const [membersData, setMembersData] = useState([])

  useEffect(() => {
    const getMembers = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: 'https://rewards/smokeywarez.com/api/v1',
          scope: 'read:members'
        })

        console.log(jwt_decode(accessToken))

        const data = await fetch('https://rewards.smokeywarez.com/api/v1/members', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        setMembersData(data)
      } catch (e) {
        console.log(e.message)
      }
    }

    getMembers()
  }, [getAccessTokenSilently, user?.sub])
  return (
    <div>
      <h2>Who are we?</h2>
      <p>{JSON.stringify(membersData)}
      </p>
    </div>
  )
}

export default App
