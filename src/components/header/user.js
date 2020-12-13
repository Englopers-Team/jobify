import './styles.scss';
import { NavLink, Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './styles.scss';
import superagent from 'superagent';
import Button from 'react-bootstrap/Button';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import * as Icon from 'react-bootstrap-icons';

export default function UserHeader() {
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
          <Nav style={{ marginRight: 124 }}>
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
            <NavDropdown data-toggle='dropdown' eventKey={1} title={<Icon.Bell color='#232b4e' size={22} />} id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.3'>Dashboard</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.1'>Saved Jobs</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>My Offers</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Applications</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Edit Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <NavDropdown
            data-toggle='dropdown'
            eventKey={1}
            title={
              <span className='pull-left' style={{ color: '#232b4e', textDecoration: 'underline', fontWeight: '600', fontSize: 17 }}>
                {companyName.split(' ')[0]}
                <img className='thumbnail-image' src={logo} alt='user pic' style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: 15, marginLeft: 10 }} />
              </span>
            }
            id='basic-nav-dropdown'
          >
            <NavDropdown.Item href='#action/3.3'>Dashboard</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>Saved Jobs</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>My Offers</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Applications</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Edit Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
