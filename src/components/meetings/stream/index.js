import React, { useEffect, useState, useRef } from 'react';

import Peer from "simple-peer";
import { If, Else, Then } from 'react-if';

import { Container, Row, Col } from 'react-bootstrap';
import { CameraVideo, CameraVideoOff, Mic, MicMute, DoorOpen } from 'react-bootstrap-icons';

import './stream.scss';

function Stream(props) {
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [mute, setMute] = useState(false);
  const [videoShow, setVideoShow] = useState(true);

  const userVideo = useRef();
  const partnerVideo = useRef();
  
  return(
    <>
    </>
  )
}

export default Stream;