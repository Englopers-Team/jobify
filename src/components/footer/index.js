import './styles.scss';
import Button from 'react-bootstrap/Button';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
export default function Footer() {
  return (
    <>
      <Navbar fixed='bottom' className='footer'>
        <Navbar.Brand href='#home'>Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>© Jobify | 2020 All rights reserved.</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
