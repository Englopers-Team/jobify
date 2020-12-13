import './styles.scss';
import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './styles.scss';
import superagent from 'superagent';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import * as Icon from 'react-bootstrap-icons';
import { If, Then, Else } from 'react-if';
import { MDBContainer } from 'mdbreact';

export default function UserHeader() {
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState('');
  const [notification, setNotification] = useState([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [notifiIcon, setNotifiIcon] = useState('');
  const [seen, setSeen] = useState('');
  const [flag, setFlag] = useState('');

  const checkSize = () => {
    setScreenSize(window.screen.width);
  };
  const scrollContainerStyle = { width: 'auto', maxHeight: '300px', height: '300px', overflowY: 'scroll', overflowX: 'hidden', padding: 0 };
  const context = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    window.addEventListener('resize', checkSize);
    if (context.token) {
      getData();
    }

    return () => {
      window.removeEventListener('resize', checkSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);

  useEffect(() => {
    if (context.token) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token]);
  const API = 'https://jobify-app-v2.herokuapp.com';

  async function getData() {
    const flagData = await superagent.get(`${API}/flag`);
    setFlag(flagData.body);
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${context.token}`);
    setCompanyName(response.body.first_name);
    setLogo(response.body.avatar);
    const data = await superagent.get(`${API}/home`).set('authorization', `Basic ${context.token}`);
    setNotification(data.body.notifications);
    data.body.notifications[0] ? setSeen(data.body.notifications[data.body.notifications.length - 1].seen) : setSeen(true);
    screenSize > 575 ? setNotifiIcon(true) : setNotifiIcon(false);
  }

  const logout = async () => {
    context.logout();
    history.push('/');
  };

  return (
    <>
      <Navbar collapseOnSelect expand='sm' bg='bg-transparent' variant='light' style={{ backgroundColor: '#eaecf1', marginBottom: '30px' }}>
        <NavLink exact to='/'>
          <Image className='logo' src='../../assets/jobify.png' />
        </NavLink>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'></Nav>
          <Nav style={{ marginRight: 123 }}>
            <Nav.Link className='link' to='/'>
              <NavLink exact to='/'>
                Dashboard
              </NavLink>
            </Nav.Link>
            <Nav.Link className='link'>
              <NavLink to='/search/company'>Employers</NavLink>
            </Nav.Link>
            <Nav.Link className='link'>
              <NavLink to='/Community'>Community</NavLink>
            </Nav.Link>
            <Nav.Link className='link' to='/about'>
              <NavLink to='/about'>About</NavLink>
            </Nav.Link>
          </Nav>

          <Nav className='one'>
            <img style={{ width: 30, height: 30, objectFit: 'cover', marginRight: 20, marginLeft: 7 }} src={flag} alt='bell' border='0' />
            <NavDropdown data-toggle='dropdown' title={notifiIcon ? seen ? <Icon.Bell color='#232b4e' size={22} /> : <img style={{ width: 22, height: 22, objectFit: 'cover' }} src='https://i.ibb.co/5Tqh4jH/bell.png' alt='bell' border='0' /> : <p style={{ fontSize: 17 }}>&nbsp;Notification</p>} id='basic-nav-dropdown'>
              <If condition={!notification[0]}>
                <Then>
                  <NavDropdown.Item>You don't have any notification</NavDropdown.Item>
                </Then>

                <Else>
                  <Then>
                    <MDBContainer className='scrollbar scrollbar-primary  mt-5 mx-auto' style={scrollContainerStyle}>
                      {notification.map((item, index) => {
                        return (
                          <Container key={index} className='notification-item'>
                            {item.description}
                          </Container>
                        );
                      })}
                    </MDBContainer>
                  </Then>
                </Else>
              </If>
            </NavDropdown>
          </Nav>
          <NavDropdown
            title={
              <span className='pull-left' style={{ color: '#232b4e', textDecoration: 'underline', fontWeight: '600', fontSize: 17 }}>
                {companyName.split(' ')[0]}
                <img className='thumbnail-image' src={logo} alt='user pic' style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: 15, marginLeft: 10 }} />
              </span>
            }
            id='basic-nav-dropdown'
          >
            <NavDropdown.Item>
              <NavLink exact to='/'>
                Dashboard
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink exact to='/applicant/saved-jobs'>
                Saved Jobs
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink exact to='/applicant/offers'>
                My Offers
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink exact to='/applicant/applications'>
                Applications
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink exact to='/reports'>
                Reports
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink exact to='/applicant/edit-profile'>
                Edit Profile
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
