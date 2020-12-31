import React, { useEffect, useState, useRef } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { If, Then, Else } from 'react-if';
import io from "socket.io-client";

import stream from './stream';
import meetings from './meetings';
import profile from './profile';
import schedule from './schedule' 

import './lobby.scss';

function Lobby(props) {
  const [show, setShow] = useState(false);
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [userToCall, setUserToCall] = useState('');
  const [initalCall, setInitalCall] = useState(false);
  const [value, onChange] = useState(new Date());

  const socket = useRef();

  return(
    <>

    </>
  )
}

export default Lobby;