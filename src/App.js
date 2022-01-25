import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <Container fluid>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>Smokey Warez Rewards</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to='members'><Nav.Link>Members</Nav.Link></LinkContainer>
          </Nav>
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
      <h2>Welcome to the homepage!</h2>
      <p>You can do this, I believe in you.</p>
    </main>
  )
}

function Members () {
  return (
    <main>
      <h2>Who are we?</h2>
      <p>
        That feels like an existential question, don't you
        think?
      </p>
    </main>
  )
}

export default App
