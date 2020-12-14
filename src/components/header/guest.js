import './styles.scss';
import { NavLink, Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './styles.scss';
import * as Icon from 'react-bootstrap-icons';
import superagent from 'superagent';
import Button from 'react-bootstrap/Button';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
export default function GuestHeader() {
  const [flag, setFlag] = useState('');

  useEffect(() => {
    getData();
  }, []);
  const API = 'https://jobify-app-v2.herokuapp.com';
  async function getData() {
    const data = await superagent.get(`${API}/flag`);
    console.log(data.body);
    setFlag(data.body);
  }

  return (
    <>
      <Navbar collapseOnSelect expand='sm' bg='bg-transparent' variant='light' style={{ backgroundColor: '#eaecf1', marginBottom: '30px' }}>
        <NavLink exact to='/'>
          <Image className='logo' src='../../assets/jobify.png' />
        </NavLink>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'></Nav>
          <Nav style={{ marginRight: 107 }}>
            <Nav.Link className='link' to='/'>
              <NavLink exact to='/'>
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link className='link'>
              <NavLink to='/search/jobs'>Jobs</NavLink>
            </Nav.Link>
            <Nav.Link className='link'>
              <NavLink to='/search/company'>Companies</NavLink>
            </Nav.Link>
            <Nav.Link className='link' to='/about'>
              <NavLink to='/about'>About</NavLink>
            </Nav.Link>
          </Nav>

          <Nav id='guest-nav'>
            <img style={{ width: 30, height: 30, objectFit: 'cover', marginRight: 20, marginLeft: 7 }} src={flag} alt='bell' border='0' />
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
          <Nav></Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
