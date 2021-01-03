import React, { useEffect, useState, useRef, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import superagent from 'superagent';
import { AuthContext } from '../../../context/auth';



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
    <>
      <h2>Profile</h2>
      <p>{props.authIdToCall}</p>
      {console.log('userInfoSecondary', userInfoSecondary)}
      {console.log('userInfoMain', userInfoMain)}
    </>
  )
}

export default Profile;