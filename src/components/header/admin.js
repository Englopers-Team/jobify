import { useState,useEffect } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useHistory, useLocation } from "react-router-dom";

export default function Admin() {

  const [active,setActive] = useState('dashboard')

  useEffect(() => {
    
    return () => {
      
    }
  }, [])


  return (
    <Container className='sideNav'>
      {/* <Row style={{ paddingTop: '10px', backgroundColor: '#eaecf1', height: '100px' }}>
        <Col className='flexCol'>
          <Image style={{ width: '140px' }} src='../../assets/jobify.png' />
        </Col>
      </Row> */}
      <Row style={{ marginTop: '40px' }}>
        <Col className='flexCol' style={{ justifyContent: 'center',alignSelf:'center',padding:'0' }}>
        <h1 style={{color:'#b4bdcc',fontWeight:'bold'}}>Jobify</h1>
        <h6 style={{color:'#42a0ec'}}>Admin Panel</h6>
        </Col>
      </Row>
      {/* <hr style={{ border: 'solid 1px #E1E3E8', borderRadius: '5px' }} /> */}
      <Row style={{ marginTop: '40px' }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px'}}>
          <Icon.HouseFill color='#b4bdcc' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#b4bdcc', marginLeft: '7px', marginBottom: '-2px' }}>Dashboard</h5>
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px'}}>
          <Icon.PersonFill color='#b4bdcc' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#b4bdcc', marginLeft: '7px', marginBottom: '-2px' }}>Users</h5>
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px'}}>
          <Icon.FilePost color='#b4bdcc' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#b4bdcc', marginLeft: '7px', marginBottom: '-2px' }}>Community</h5>
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px'}}>
          <Icon.QuestionCircleFill color='#b4bdcc' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#b4bdcc', marginLeft: '7px', marginBottom: '-2px' }}>Reports</h5>
        </Col>
      </Row>

      <Row style={{ bottom:'20px',position:'fixed' }}>
        <Col className='flexRow' style={{ justifyContent: 'flex-start', alignContent: 'center', padding: '0', marginLeft: '15px'}}>
          <Icon.DoorClosedFill color='#42a0ec' size='20' style={{ marginLeft: '10px' }} />
          <h5 style={{ color: '#42a0ec', marginLeft: '7px', marginBottom: '-2px' }}>Logout</h5>
        </Col>
      </Row>

    </Container>
  );
}
