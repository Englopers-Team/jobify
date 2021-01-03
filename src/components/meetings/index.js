
import React, { useEffect, useState, useRef, useContext } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { If, Then, Else } from 'react-if';
import io from "socket.io-client";

import Stream from './stream';
import Meetings from './meetingsDetails';
import Profile from './profile';
import Schedule from './schedule'
import superagent from 'superagent';


import { AuthContext } from '../../context/auth';
import { useHistory } from "react-router-dom";



import './lobby.scss';


function Lobby(props) {
  const [show, setShow] = useState(false);
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [userToCall, setUserToCall] = useState('');
  const [initalCall, setInitalCall] = useState(false);
  const [value, onChange] = useState(new Date());
  const [userDeatails, setUserDeatails] = useState({})
  const [myMeetings, setMyMeetings] = useState([])
  const [removed, setRemoved] = useState(false)
  const history = useHistory();



  const context = useContext(AuthContext);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("https://backendmrstream.herokuapp.com");

    socket.current.on('allUserDetails', (userDeatails) => {
      setUserDeatails(userDeatails);
    })

    socket.current.on("yourID", (id) => {
      setYourID(id);

    })
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })





    setTimeout(() => {

      if (!removed) {
        const footer = document.querySelector('.footer-container');
        const headerr = document.querySelector('.navbar');
        const chatBtn = document.querySelector('#chatButton');
        const cont = document.querySelector('.page-container');

        footer.classList.add('hideEle')
        chatBtn.classList.add('hideEle')
        headerr.classList.add('hideEle')
        cont.classList.add('contHeight')
        setRemoved(true)
      }


    }, 500)

    return () => {
      const footer = document.querySelector('.footer-container');
      const headerr = document.querySelector('.navbar');
      const chatBtn = document.querySelector('#chatButton');
      const cont = document.querySelector('.page-container');

      footer.classList.remove('hideEle')
      chatBtn.classList.remove('hideEle')
      headerr.classList.remove('hideEle')
      cont.classList.remove('contHeight')
    }

  }, []);




  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/meetings`).set('authorization', `Basic ${context.token}`);
    setMyMeetings(response.body);
  }

  useEffect(() => {
    socket.current.emit('addMyId', { myId: context.user.id })
    setInitalCall(context.user.account_type === 'p' ? false : true)
    if (context.token) {
      getData();
    }
  }, [context.user.id, context.token])




  useEffect(() => {
    return () => {
      socket.current.emit("leaveMeeting")
    }
  }, [])




  return (
    <Container style={{ margin: '0', minWidth: '100%', zIndex: '9999', position: 'fixed', top: 0, background: 'rgb(35, 35, 51)' }}>

      <Row style={{ display: 'flex', flexDirection: 'row' }}>
        <Col class='flexCol' sm={3} style={{ width: '20%', height: '100vh', backgroundColor: '#e1e3e8', display: 'flex', flexDirection: 'column' }}>
          <img alt='Jobify' src='./assets/jobify.png' style={{ alignSelf: 'center', width: '100%', maxWidth: '300px', textAlign: 'center' }} />
          <hr style={{ marginTop: 0 }}></hr>
          <If condition={show && userToCall !== ''}>
            <Then>
              <Profile />
            </Then>
            <Else>
              <Meetings myMeetings={myMeetings} users={users} userDeatails={userDeatails} yourID={yourID} setUserToCall={setUserToCall} setShow={setShow} value={value} />
              <button style={{ background: '#504edf', fontSize: '18px', height: '5vh', fontWeight: 'bold', position: 'absolute', bottom: 0, border: 0, left: 0, width: '100%' }} onClick={() => {
                socket.current.emit("leaveMeeting")
                history.push('/')

              }}>Close Meetings</button>
            </Else>
          </If>
        </Col>
        <Col sm={9} style={{ width: '80%', padding: 0, border: 'solid 5px rgb(35, 35, 51)', borderBottom: 'none' }}>
          <If condition={show && userToCall !== ''}>
            <Then>
              <Stream setShowHandler={setShow} yourID={yourID} userToCall={userToCall} socket={socket.current} initalCall={initalCall} />
            </Then>
            <Else>
              <Container style={{ height: '100vh' }}>
                <Schedule onChange={onChange}
                  value={value} />
              </Container >
            </Else>
          </If>
        </Col>
      </Row>
    </Container >
  )
}

export default Lobby;