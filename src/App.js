import JsonSearch from 'search-array'
import jwtDecode from 'jwt-decode'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

import { Container, Form, Navbar, Nav, Table } from 'react-bootstrap'
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
        const decoded = jwtDecode(accessToken)
        if (decoded.permissions && decoded.permissions.includes('read:members')) { setReadMembersScope(true) }
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
          {/* <img
            src='/logo192.png'
            width='30'
            height='30'
            className='d-inline-block align-top'
            alt='Smokey Warez logo'
          /> */}
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

        <Route path='/' element={<Container><Home /></Container>} />
        <Route path='members' element={<Container><Members /></Container>} />

      </Routes>
    </Container>
  )
}

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
  const [membersDataClone, setMembersDataClone] = useState([])
  const [membersDataCols] = useState(['first_name', 'last_name', 'email', 'phone'])
  const [membersDataFilter, setMembersDataFilter] = useState(null)

  useEffect(() => {
    const getMembers = async () => {
      try {
        const accessToken = await getAccessTokenSilently()
        // eslint-disable-next-line no-undef
        const response = await fetch(`${process.env.REACT_APP_AUTH_API_AUDIENCE}/members`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        const body = await response.json()
        setMembersData(body)
        setMembersDataClone(body)
      } catch (e) {
        console.log(e.message)
      }
    }
    getMembers()
  }, [getAccessTokenSilently, user?.sub])

  function filterArray (value, array) {
    const searcher = new JsonSearch(array)
    return searcher.query(`${value}`)
  }

  const membersTableHeaders = membersDataCols.length
    ? membersDataCols.map((prop, i) => <th key={i}>{prop}</th>)
    : <th />

  const membersTable = membersData.length
    ? membersDataClone.map((member, i) => {
        const cells = membersDataCols.map((prop, ix) => <td key={ix}>{membersData[i][prop]}</td>)
        return (
          <tr key={i}>
            {cells}
          </tr>
        )
      })
    : <tr />

  return (
    <div>
      <h2>Members</h2>
      <Form.Control
        type='text' placeholder='Search' value={membersDataFilter} onChange={(e) => {
          const value = e.target.value
          console.log(value)
          setMembersDataFilter(value)
          if (value) {
            setMembersDataClone(filterArray(value, membersData))
          } else if (value === '') setMembersDataClone(membersData)
        }}
      />
      <Table responsive>
        <thead>
          <tr>
            {membersTableHeaders}
          </tr>
        </thead>
        <tbody>
          {membersTable}
        </tbody>
      </Table>
    </div>
  )
}

export default App
