import React, { useEffect, useState, useRef, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import superagent from 'superagent';
import { AuthContext } from '../../../context/auth';
import { If, Else, Then } from 'react-if'
import '../../../index.css'

function Profile(props) {
  const [userInfoSecondary, setUserInfoSecondary] = useState([])
  const [userInfoMain, setUserInfoMain] = useState([])

  const context = useContext(AuthContext);

  async function getSecondaryData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/search/get-full-info/${props.authIdToCall}`).set('authorization', `Basic ${context.token}`);
    setUserInfoSecondary(response.body);
  }

  async function getmainData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/getinfo/${props.authIdToCall}`).set('authorization', `Basic ${context.token}`);
    setUserInfoMain(response.body);
  }

  useEffect(() => {
    getSecondaryData()
    getmainData()
  }, [context.token, props.authIdToCall])
  return (
    <Container>
      <Row style={{ justifyContent: 'center' }}>
        <img style={{ width: '128px', height: '128px', objectFit: 'cover', borderRadius: '50%' }} src={userInfoMain.avatar ? userInfoMain.avatar : userInfoMain.logo}></img>
      </Row>
      <Row class='flexCol' style={{ dispaly: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '24px', marginBottom: '0', fontWeight: 'bold', textAlign: 'center' }}>{userInfoMain.first_name} {userInfoMain.last_name}</p>
        <p style={{ fontSize: '16px', fontWeight: '500', textAlign: 'center' }}>{userInfoMain.job_title}</p>
      </Row>
      <hr style={{ width: '70%', margin: '0 auto' }}></hr>

      <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginLeft: '20px', marginRight: '20px' }}>
        <Col style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '16px', textAlign: 'left' }}><strong style={{ marginRight: '5px' }}>Location:</strong> {userInfoMain.country}</p>
        </Col>
        <Col style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '16px', textAlign: 'right' }}><strong style={{ marginRight: '5px' }}>Age:</strong> {userInfoMain.age}</p>

        </Col>
      </Row>
      {console.log('userInfoSecondary', userInfoSecondary)}
      {console.log('userInfoMain', userInfoMain)}
    </Container>
  )
}

export default Profile;