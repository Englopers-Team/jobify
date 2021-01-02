
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
  const [account_type , setAccountType] =useState('');



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
      const footer = document.querySelector('.footer-container');
      const headerr = document.querySelector('.navbar');
      const chatBtn = document.querySelector('#chatButton');
      const cont = document.querySelector('.page-container');
      footer.parentNode.removeChild(footer);
      chatBtn.parentNode.removeChild(chatBtn);
      headerr.parentNode.removeChild(headerr);
      cont.style.minHeight = '100vh'

    }, 500)


  }, []);

  
  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/meetings`).set('authorization', `Basic ${context.token}`);
    setMyMeetings(response.body);
  }

  useEffect(() => {
    socket.current.emit('addMyId', { myId: context.user.id })
    setAccountType(context.user.account_type);
    console.log('accountType' , account_type)
    if(context.token){
      getData();
    }
  }, [context.user.id , context.token])




  useEffect(() => {
    return () => {
      socket.current.emit("leaveMeeting")
    }
  }, [])




  return (
    <Container style={{ margin: '0', minWidth: '100%', zIndex: '9999', position: 'fixed', top: 0, background: 'rgb(35, 35, 51)' }}>

      <Row style={{ display: 'flex', flexDirection: 'row' }}>
        <Col sm={3} style={{ width: '20%', height: '100vh', backgroundColor: '#e1e3e8' }}>
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
              <Meetings account_type={account_type} myMeetings={myMeetings} users={users} userDeatails={userDeatails} yourID={yourID} setUserToCall={setUserToCall} setShow={setShow} value={value} />
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