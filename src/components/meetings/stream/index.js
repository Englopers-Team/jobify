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
      <video style={{ width: '100%', border: '2px solid #232333', borderRadius: '5px' }} muted playsInline ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video style={{ minWidth: '100%', height: '90vh' }} muted={mute} playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div id='goDiv'>
        <Row style={{ fontSize: '32px' }}> Interviewer request you to the meeting </Row>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col>Press <b>GO</b> to start, <b>Jobify wish you luck</b></Col>
        </Row>
      <Row>
      <Col style={{marginTop:'20px'}}><button id='goButton' onClick={acceptCall}>GO</button></Col>
      </Row>
      </div>
    )
  }
  function videoOff() {
    stream.getTracks().forEach(track => track.enabled = !track.enabled);
  }
  if (props.initalCall) {
    callPeer();
  }

  return (
    <Container style={{ position: 'relative', height: '100vh',margin:0,minWidth:'100%' }}>
      <Row style={{ display: 'flex', justifyContent: 'center', minHeight: '90vh', backgroundColor: 'black' }}>
        <Col style={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '99', position: 'fixed', right: '10px', top: '10px' }} sm={6}>
          {UserVideo}
        </Col>
        <Col style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'cover',minWidth:'100%' }} sm={6} >
          {PartnerVideo}
          <If condition={!callAccepted}>
            <img style={{ width: '25%' }} src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="thumbnail" className="img-thumbnail" />
          </If>
        </Col>
      </Row>
      <Row style={{ margin:0,display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: '0', width: '100%', height: '10vh', backgroundColor: '#232333', alignItems: 'center', right: '0' }}>
        <Container style={{ display: 'flex', flexDirection: 'row',margin:0,minWidth:'100%' }}>
            <Col style={{textAlign:'left'}}>
            <If condition={mute}>
              <Then>
                <MicMute color='#BABACC' style={{ marginRight:'50px',cursor: 'pointer', alignItems: 'center' }} size='32' onClick={() => { setMute(mute ? false : true) }} />
              </Then>
              <Else>
                <Mic color='#BABACC' style={{marginRight:'50px', cursor: 'pointer' }} size='32' onClick={() => { setMute(mute ? false : true) }} />
              </Else>
            </If>
            <If condition={videoShow}>
              <Then>
                <CameraVideo color='#BABACC' style={{ cursor: 'pointer' }} size='32' onClick={() => {
                  videoOff()
                  setVideoShow(false)
                }} />
              </Then>
              <Else>
                <CameraVideoOff color='#BABACC' style={{ cursor: 'pointer' }} size='32' onClick={() => {
                  videoOff()
                  setVideoShow(true)
                }} />
              </Else>
            </If>
            </Col>
            
            <Col style={{textAlign:'right'}}>
            <DoorOpen color='#BABACC' style={{ cursor: 'pointer' }} size='32' onClick={() => {
            stream.getAudioTracks()[0].stop();
            stream.getVideoTracks()[0].stop();
            props.socket.emit("leaveRoom", { userToCall: caller, from: props.yourID })
            props.setShowHandler(false)
          }} />
            </Col>
            
        </Container>
          
      </Row>
      <If condition={!callAccepted}>
        <div style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translate(-50%,-50%)'  }}>
          {incomingCall}
        </div>
      </If>
    </Container>
  )
}

export default Stream;