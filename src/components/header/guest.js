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
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState('');
  // const [loader, setLoader] = useState(false);
  let history = useHistory();

  useEffect(() => {
    getData();
  }, []);
  const API = 'https://jobify-app-v2.herokuapp.com';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudF90eXBlIjoiYyIsInByb2ZpbGUiOnsiaWQiOjEsIm5hbWUiOiJEZW1vIENvbXBhbnkiLCJsb2dvIjoiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL3N2Zy9zdGF0aWMvaWNvbnMvc3ZnLzk5My85OTM4OTEuc3ZnIiwiY291bnRyeSI6IlVTQSJ9LCJpYXQiOjE2MDc3MzMwNjIsImV4cCI6MzYxNjA3NzMzMDYyfQ.4m57l6B3uXRcUpylAEzUAdfNx0E3xTuh9SukCEtZuX8';
  async function getData() {
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${token}`);
    setCompanyName(response.body.company_name);
    setLogo(response.body.logo);
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
    </>
  );
}
