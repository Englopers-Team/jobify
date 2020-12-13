import './styles.scss';
import Button from 'react-bootstrap/Button';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
export default function Header() {
  return (
    <Navbar collapseOnSelect expand='sm' bg='bg-transparent' variant='light' style={{ backgroundColor: '#eaecf1', marginBottom: '30px'}}>
      <NavLink exact to='/'>
        <Image className='logo' src='../../assets/jobify.png' />
      </NavLink>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'></Nav>
        <Nav>
          <Nav.Link className='link' to='/'>
            <NavLink exact to='/'>
              Home
            </NavLink>
          </Nav.Link>
          <Nav.Link className='link'>
            <NavLink to='/search/jobs'>Jobs</NavLink>
          </Nav.Link>
          <Nav.Link className='link'>
            <NavLink to='/community'>Community</NavLink>
          </Nav.Link>
          <Nav.Link className='link' to='/about'>
            <NavLink to='/about'>About</NavLink>
          </Nav.Link>
        </Nav>

        <Nav>
          <Link exact to='/signup'>
            <Button className='button' variant='outline-light'>
              SignUp
            </Button>
          </Link>
          <Link exact to='/signin'>
            <Button className='button-login' variant='outline-light'>
              Login
            </Button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
