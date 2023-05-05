import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
    return (
        <>
          <Navbar bg="dark" variant="dark" fixed="top" >
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="/"><Navbar.Brand href="" className="intro">Online Auction</Navbar.Brand></Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
}

export default NavigationBar;