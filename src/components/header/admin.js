import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useHistory, useLocation } from "react-router-dom";

export default function Admin() {

  const history = useHistory();
  const { pathname } = useLocation();
  const path = pathname.split('/')

  useEffect(() => {

    if (path[2] === 'reports') {
      const element = document.getElementById('reports');
      element.classList.add('activeSide');
    } else if (path[2] === 'users') {
      const element = document.getElementById('users');
      element.classList.add('activeSide');
    } else if (path[2] === 'community') {
      const element = document.getElementById('community');
      element.classList.add('activeSide');
    } else if (path[1] === 'admin') {
      const element = document.getElementById('dashboard');
      element.classList.add('activeSide');
    }
    return () => {

    }
  }, [pathname])


  return (
    <Container className='sideNav'>
      <Row style={{ marginTop: '40px' }}>
        <Col className='flexCol' style={{ justifyContent: 'center', alignSelf: 'center', padding: '0' }}>
          <h1 style={{ color: '#b4bdcc', fontWeight: 'bold' }}>Jobify</h1>
          <h6 style={{ color: '#42a0ec' }}>Admin Panel</h6>
        </Col>
      </Row>
      {/* <hr style={{ border: 'solid 1px #E1E3E8', borderRadius: '5px' }} /> */}
      <Row id='dashboard' style={{ marginTop: '40px', paddingTop: '9px', paddingBottom: '9px', cursor: 'pointer' }} onClick={() => {
        history.push('/admin')
      }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px' }} onClick={() => {
          history.push('/admin')
        }}>
          <Icon.HouseFill color='#b4bdcc' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#b4bdcc', marginLeft: '7px', marginBottom: '-2px' }}>Dashboard</h5>
        </Col>
      </Row>

      <Row id='users' style={{ marginTop: '14px', paddingTop: '9px', paddingBottom: '9px', cursor: 'pointer' }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px' }} onClick={() => {
          history.push('/admin/users')
        }}>
          <Icon.PersonFill color='#b4bdcc' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#b4bdcc', marginLeft: '7px', marginBottom: '-2px' }}>Users</h5>
        </Col>
      </Row>

      <Row id='community' style={{ marginTop: '14px', paddingTop: '9px', paddingBottom: '9px', cursor: 'pointer' }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px' }} onClick={() => {
          history.push('/admin/community')
        }}>
          <Icon.FilePost color='#b4bdcc' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#b4bdcc', marginLeft: '7px', marginBottom: '-2px' }}>Community</h5>
        </Col>
      </Row>

      <Row id='reports' style={{ marginTop: '14px', paddingTop: '9px', paddingBottom: '9px', cursor: 'pointer' }} onClick={() => {
        history.push('/admin/reports')
      }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px' }}>
          <Icon.QuestionCircleFill color='#b4bdcc' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#b4bdcc', marginLeft: '7px', marginBottom: '-2px' }}>Reports</h5>
        </Col>
      </Row>

      <Row style={{ bottom: '20px', position: 'fixed', cursor: 'pointer' }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px' }} onClick={() => {
          history.push('/logout')
        }}>
          <Icon.DoorClosedFill color='#b4bdcc' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#b4bdcc', marginLeft: '7px', marginBottom: '-2px' }}>Logout</h5>
        </Col>
      </Row>

    </Container>
  );
}
