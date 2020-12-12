import './styles.scss';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
export default function Footer() {
  return (
    <>
      <Navbar expand='sm' variant='light' bg='bg-transparent' className='footer'>
        <Container className='footer-container'>
          <Row>
            <Nav.Link>
              <NavLink to='/search/employees'>Jobs</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='/community'>community</NavLink>
            </Nav.Link>
            <Nav.Link to='/about'>
              <NavLink to='/about'>About</NavLink>
            </Nav.Link>
          </Row>
          <Row>
            <Navbar.Text className='footer-text'>© Jobify | 2020 All rights reserved.</Navbar.Text>
          </Row>
        </Container>
      </Navbar>
    </>
  );
}
