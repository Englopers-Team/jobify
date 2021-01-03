import React, { useEffect, useState, useRef, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import superagent from 'superagent';
import { AuthContext } from '../../../context/auth';
import { If, Else, Then } from 'react-if'
import '../../../index.css'
import { useHistory } from "react-router-dom";

function Profile(props) {
  const history = useHistory();

  const [userInfoSecondary, setUserInfoSecondary] = useState([])
  const [userInfoMain, setUserInfoMain] = useState([])
  const [pdf, setPDF] = useState(false)
  const [btn, setBtn] = useState('Applicant  Resume')

  useEffect(() => {
    if (pdf) {
      const frame = document.getElementById('iframepdf')
      frame.style.height = '95vh'
      setBtn('Applicant Profile')
    } else {
      const frame = document.getElementById('iframepdf')
      frame.style.height = '0'
      setBtn('Applicant  Resume')
    }
  }, [pdf])

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
    <Container style={{ height: '100%' }}>
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
      <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginLeft: '20px', marginRight: '20px' }}>
        <Col style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>Summery</p>
          <p style={{ fontSize: '16px', textAlign: 'left' }}>{userInfoMain.sammary}</p>
        </Col>
      </Row>


      <iframe style={{ height: '0%', position: 'absolute', bottom: '5vh', top: 0, border: 0, left: 0, width: '100%', overflow: 'scroll' }} id="iframepdf" src={userInfoMain.cv}></iframe>

      <button style={{ background: '#504edf', fontSize: '18px', height: '5vh', fontWeight: 'bold', position: 'absolute', bottom: 0, border: 0, left: 0, width: '100%' }} onClick={() => {

        setPDF(!pdf)
        // window.open(userInfoMain.cv, 'popUpWindow', 'height=800,width=600,left=10,top=10,,scrollbars=yes,menubar=no'); return false;
      }}>{btn}</button>
      {console.log('userInfoSecondary', userInfoSecondary)}
      {console.log('userInfoMain', userInfoMain)}
    </Container>
  )
}

export default Profile;