import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
    return (
        <>
          <Navbar bg="light" variant="light" fixed="top" >
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="/"><Navbar.Brand href="" className="intro">Online Auction</Navbar.Brand></Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link href="/favourites">Favourites</Nav.Link>
                <Nav.Link href="/signin">Signin</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
}

export default NavigationBar;