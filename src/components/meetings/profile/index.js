import React, { useEffect, useState, useRef , useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import superagent from 'superagent';
import { AuthContext } from '../../../context/auth';



function Profile(props) {
  const [userInfoSecondary ,setUserInfo] = useState([])
  const context = useContext(AuthContext);

  async function getSecondaryData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/search/get-full-info/${props.authIdToCall}`).set('authorization', `Basic ${context.token}`);
    setUserInfo(response.body);
  }

  useEffect(()=>{
    getSecondaryData()
  },[context.token,props.authIdToCall])
  return (
    <>
      <h2>Profile</h2>
      <p>{props.authIdToCall}</p>
      {console.log('userInfoSecondary',userInfoSecondary)}
    </>
  )
}

export default Profile;