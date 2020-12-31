import React, { useEffect, useState, useRef } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import Calendar from 'react-calendar'
import { If, Then, Else } from 'react-if'
import io from "socket.io-client";

import stream from './stream';
import meetings from './meetings';
import profile from './profile';


import './lobby.scss'

function Lobby(props) {

}

export default Lobby;