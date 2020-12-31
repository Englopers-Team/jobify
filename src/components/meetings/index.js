
import React, { useEffect, useState, useRef, useContext } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { If, Then, Else } from 'react-if';
import io from "socket.io-client";

import Stream from './stream';
import Meetings from './meetingsDetails';
import Profile from './profile';
import Schedule from './schedule'

import { AuthContext } from '../../context/auth';


import './lobby.scss';


function Lobby(props) {
  const [show, setShow] = useState(false);
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [userToCall, setUserToCall] = useState('');
  const [initalCall, setInitalCall] = useState(false);
  const [value, onChange] = useState(new Date());
  const [userDeatails, setUserDeatails] = useState({})

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



    console.log(context.user.id, yourID)

  }, []);

  useEffect(()=>{
    socket.current.emit('addMyId', { myId: context.user.id })

  },[context.user.id])

  useEffect(() => {
    return () => {
      socket.current.emit("leaveMeeting")
    }
  }, [])

  return (
    <Container >
      {console.log('userDeatails', userDeatails)}

      <Row style={{ display: 'flex', flexDirection: 'row' }}>
        <Col sm={3} style={{ width: '20%', height: '100vh', backgroundColor: 'green' }}>
          <input type='checkbox' name='test' onClick={() => { setInitalCall(initalCall ? false : true) }} />
          <h1>Jobify Meetings</h1>
          <button onClick={() => {
            socket.current.emit("leaveMeeting")
            props.setShowHandler(false)
          }}>Close Meetings</button>
          <If condition={show && userToCall !== ''}>
            <Then>
              <Profile />
            </Then>
            <Else>
              <Meetings users={users} userDeatails={userDeatails} yourID={yourID} setUserToCall={setUserToCall} setShow={setShow} value={value} />
            </Else>
          </If>
        </Col>
        <Col sm={9} style={{ width: '80%' }}>
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