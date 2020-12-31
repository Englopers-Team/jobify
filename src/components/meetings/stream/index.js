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

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })

    props.socket.on("calling", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })

  }, []);

  useEffect(() => {
    return () => {
      props.socket.emit("leaveRoom", { userToCall: caller, from: props.yourID })
    }
  }, [])

  function callPeer() {
    console.log('peer')
    const peer = new Peer({
      initiator: true,
      trickle: false,
      // config: {
      //   iceServers: [{ 'url': 'stun:custom.stun.server:3478' }]
      // },
      stream: stream,
    });

    peer.on("signal", data => {
      props.socket.emit("callUser", { userToCall: props.userToCall, signalData: data, from: props.yourID })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    props.socket.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

    props.socket.on('endCall', () => {
      peer.destroy();
    })

  }

  function acceptCall() {
    console.log('peer')

    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      props.socket.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    props.socket.on('endCall', signal => {
      peer.destroy();
    })

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video style={{ width: '100%' , border: '2px solid #232333' , borderRadius: '5px' }} muted playsInline ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video style={{ width: '100%' , height:'90vh'  }} muted={mute} playsInline ref={partnerVideo} autoPlay />
    );
  }
  
  return(
    <>
    </>
  )
}

export default Stream;