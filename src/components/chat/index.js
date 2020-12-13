import { useEffect, useState, useContext } from 'react';
import { Badge, ListGroup, Form, Col, Container, Row, Image, Button } from 'react-bootstrap';

import * as Icon from 'react-bootstrap-icons';

import { If, Then, Else } from 'react-if';
import { SocketContext } from '../../context/socket';
import { AuthContext } from '../../context/auth';
import './styles.scss';

export default function Chat() {
  const context = useContext(SocketContext);
  const authContext = useContext(AuthContext);

  const [message, setMessage] = useState();
  const [secondParty, setSecondParty] = useState();
  const [secondPartyChar, setSecondPartyChar] = useState('');

  const [secondPartyIId, setSecondPartyIId] = useState();

  const [messages, setMessages] = useState([]);
  const [visibleL, setVisibleL] = useState(false);
  const [visibleC, setVisibleC] = useState(false);
  const [targerIndex, setTargerIndex] = useState();
  const [specificName, setSpecificName] = useState('')
  const [myAvatar, setMyAvatar] = useState('');
  const [otherAvatar, setOtherAvatar] = useState('');

  const [comp, setComp] = useState('list')

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudF90eXBlIjoicCIsInByb2ZpbGUiOnsiaWQiOjEsImZpcnN0IjoiTWFsZWsiLCJsYXN0IjoiQWhtZWQiLCJhdmF0YXIiOiJodHRwczovL2xpYnJhcnkua2lzc2NsaXBhcnQuY29tLzIwMTgwOTI5L29vcS9raXNzY2xpcGFydC1hdmF0YXItcGVyc29uLWNsaXBhcnQtYXZhdGFyLWNvbXB1dGVyLWljb25zLXBlcnNvbi04NzM1NWM1NmExNzQ4NDczLmpwZyIsImNvdW50cnkiOiJVU0EifSwiaWF0IjoxNjA3NjA2ODQyLCJleHAiOjM2MTYwNzYwNjg0Mn0.ZBf0SDIjCv3JQK42nNhmGgdhWbJHY2FQNz1fI2WwXkQ';
  useEffect(() => {
    context.socketMessg.emit('join', token);
    context.socketMessg.on('message', (payload) => {
      setMessages(payload[0]);
      if (payload[1] === 'person') {
        setSecondParty('company_id');
        setSecondPartyChar('c');
      } else {
        setSecondParty('person_id');
        setSecondPartyChar('p');
      }
    })

    context.socketMessg.emit('checkMsg', { token })

    return () => {
      context.socketMessg.off('message');
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function ChatListView() {
    return messages.map((item, index) => {
      return (
        <Row className='listNames' key={index} onClick={() => {
          setSecondPartyIId(item[Object.keys(item)[0]][0][secondParty])
          specificChatHandler(index, Object.keys(item)[0])
          const compList = document.getElementById('compList')
          const compChat = document.getElementById('compChat')
          compList.classList.add('opout')
          setTimeout(() => {
            compList.classList.remove('opout')
            compList.classList.add('compdel')
            compChat.classList.add('opin')
            compChat.classList.remove('compdel')
          }, 500)
          // compShow.classList.add('slideoutBtn')
        }
        }>
          <Col style={{ justifyContent: 'center', alignSelf: 'center' }} sm={2}>
            <Image style={{ width: '48px' }} src={item.profile.logo} roundedCircle />
          </Col>
          <Col sm={0} lg={1}>
          </Col>
          <Col style={{ justifyContent: 'center', alignSelf: 'center' }} sm={10}>
            <p style={{ margin: 0 }}>{Object.keys(item)[0]}</p>
          </Col>

        </Row>
      )
    })
  }

  function ChatView() {
    const arr = messages.filter((item, index) => {
      return index === targerIndex
    })

    return arr[0][specificName].map((mesg, index) => {
      if (mesg.sender === secondPartyChar) {
        return (
          <Row className='otherMessg' key={index}>
            {/* <Col sm={1}></Col> */}
            <Col style={{ padding: '2px' }} sm={11}>
              <p id='messg' style={{ float: 'right', marginRight: '10px' }}>
                {mesg.body}
              </p>
            </Col>
            <Col style={{ alignSelf: 'center', padding: 0, textAlign: 'right' }} sm={1}>
              <Image style={{ width: '28px' }} src={authContext.user.profile.avatar} roundedCircle />
            </Col>
          </Row>
          // <ListGroup.Item id='messg' className='otherMessg' key={index}>
          // </ListGroup.Item>
        )
      } else {
        return (
          <Row className='myMessg' key={index}>
            <Col style={{ alignSelf: 'center', padding: 0, textAlign: 'left', marginRight: '10px' }} sm={1}>
              <Image style={{ width: '28px' }} src={arr[0].profile.logo} roundedCircle />
            </Col>
            <Col style={{ padding: '2px' }} sm={10}>
              <p id='messg' style={{ float: 'left' }}>
                {console.log(arr[0])}
                {mesg.body}
              </p>
            </Col>
            {/* <Col sm={1}></Col> */}
          </Row>
        )
      }
    })
  }

  function specificChatHandler(index, name) {
    setTargerIndex(index);
    setSpecificName(name);
    // setVisibleL(false);
    // setVisibleC(true);
  }

  return (
    <>
      {/* <Icon.ChatDotsFill id='chatButton' onClick={() => {
        setVisibleL(true)
        setVisibleC(false);
      }}
      /> */}
      <Container id='chatButton' className='slideinBtn' onClick={() => {
        const sideBtn = document.getElementById('chatButton')
        const chatBox = document.getElementById('chat')
        sideBtn.classList.remove('slideinBtn')
        sideBtn.classList.add('slideoutBtn')
        setTimeout(() => {
          sideBtn.classList.add('hide')
          sideBtn.classList.remove('slideoutBtn')
          chatBox.classList.remove('hideChat')
          chatBox.classList.add('slideinChat')
        }, 500)
        // setVisibleL(true)
        // setVisibleC(false);
      }}><p style={{ margin: 0, alignSelf: "center" }}> <Icon.ChatRightDotsFill color='whitesmoke' size='32' /></p>
      </Container>


      <Container id='chat' className='hideChat' >
        <Row className='flexRow' style={{ backgroundColor: '#504edf', color: 'whitesmoke', width: '100%', margin: 0, borderTopLeftRadius: '10px' }}>
          <Col sm={2}>
            <If condition={secondPartyIId}>
              <Icon.ArrowLeftCircleFill onClick={() => {
                const compList = document.getElementById('compList')
                const compChat = document.getElementById('compChat')
                compChat.classList.add('opout')
                setTimeout(() => {
                  compChat.classList.remove('opout')
                  compChat.classList.add('compdel')
                  compList.classList.add('opin')
                  compList.classList.remove('compdel')
                  setSecondPartyIId()
                }, 500)
              }} size='22' color='#DEDEE3' style={{ cursor: 'pointer' }} />
            </If>
          </Col>
          <Col sm={7}>
            <If condition={secondPartyIId}>
              <Then>
                <h5 style={{ fontWeight: '500', marginTop: '12px', marginBottom: '12px', marginRight: 0, textAlign: 'center' }}>
                  {specificName}
                </h5>
              </Then>
              <Else>
                <h4 style={{ fontWeight: '500', marginTop: '12px', marginBottom: '12px', marginRight: 0, textAlign: 'center' }}>
                  Messages
                  </h4>
              </Else>
            </If>

          </Col>
          <Col className='xPhone' style={{ textAlign: 'center' }} sm={2}>
            <Icon.XCircleFill onClick={() => {
              const chatBox = document.getElementById('chat')
              const sideBtn = document.getElementById('chatButton')
              const input = document.getElementById('compInput')
              const btn = document.getElementById('compSend')
              chatBox.classList.remove('slideinChat')
              chatBox.classList.add('slideoutChat')
              
              const compList = document.getElementById('compList')
                const compChat = document.getElementById('compChat')
                compChat.classList.add('opout')
                setTimeout(() => {
                  compChat.classList.remove('opout')
                  compChat.classList.add('compdel')
                  compList.classList.add('opin')
                  compList.classList.remove('compdel')
                  setSecondPartyIId()
                }, 500)

              setTimeout(() => {
                chatBox.classList.add('hideChat')
                chatBox.classList.remove('slideoutChat')
                sideBtn.classList.remove('hide')
                sideBtn.classList.add('slideinBtn')
              }, 600)
            }} size='22' color='#DEDEE3' style={{ cursor: 'pointer' }} />

          </Col>
        </Row>
        <Row className='flexCol' >
          <Container id='compList' style={{ width: '80%' }}>
            <ChatListView />
          </Container>
          <Container id='compChat' className='compdel' style={{ width: '85%' }}>
            <If condition={secondPartyIId}>
              <Then>
                <ChatView />
                <Container id='compInput' style={{ width: '100%', padding: 0 }}>
                  <Form.Control id='inputSend' value={message} required name="text" onChange={(e) => { setMessage(e.target.value) }} type="text" />
                </Container>
                <Container id='compSend' style={{ width: '100%', padding: 0 }}>
                  <Button className='buttonSend' onClick={() => {
                    context.socketMessg.emit('message', { body: message, receiver: secondPartyIId, token: token, type: secondPartyChar })
                    context.socketMessg.emit('checkMsg', { token })
                    setMessage('')
                    setTimeout(() => {
                      var objDiv = document.getElementById("compChat");
                      objDiv.scrollTop = objDiv.scrollHeight;

                    }, 300)
                    // console.log(objDiv.scrollHeight)
                  }}>Send</Button>
                </Container>
              </Then>
            </If>
          </Container>
        </Row>
      </Container>
    </>
  )
}


