import { useEffect, useState, useContext } from 'react';
import { Badge, ListGroup, Form, Button, Container } from 'react-bootstrap';

import * as Icon from 'react-bootstrap-icons';

import { If, Then } from 'react-if';
import { SocketContext } from '../../context/socket';
import './styles.scss';

export default function Chat() {
  const context = useContext(SocketContext);

  const [message, setMessage] = useState();
  const [secondParty, setSecondParty] = useState();
  const [secondPartyChar, setSecondPartyChar] = useState('');

  const [secondPartyIId, setSecondPartyIId] = useState();

  const [messages, setMessages] = useState([]);
  const [visibleL, setVisibleL] = useState(false);
  const [visibleC, setVisibleC] = useState(false);
  const [targerIndex, setTargerIndex] = useState();
  const [specificName, setSpecificName] = useState('')

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

  }, []);


  function ChatListView() {
    return messages.map((item, index) => {
      return (
        <ListGroup.Item key={index} onClick={() => {
          setSecondPartyIId(item[Object.keys(item)[0]][0][secondParty])
          specificChatHandler(index, Object.keys(item)[0])
        }
        }>
          {Object.keys(item)[0]}
        </ListGroup.Item>
      )
    })
  }

  function ChatView() {
    const arr = messages.filter((item, index) => {
      return index === targerIndex
    })

    return arr[0][specificName].map((mesg, index) => {
      if(mesg.sender === secondPartyChar){
        return (
          <ListGroup.Item id='messg' className='otherMessg' key={index}>
            {mesg.body}
          </ListGroup.Item>
        )
      }else{
        return (
          <ListGroup.Item id='messg' className='myMessg' key={index}>
            {mesg.body}
          </ListGroup.Item>
        )
      }
    })
  }

  function specificChatHandler(index, name) {
    setTargerIndex(index);
    setVisibleL(false);
    setVisibleC(true);
    setSpecificName(name);
  }

  return (
    <>
      <Icon.ChatDotsFill id='chatButton' onClick={() => {
        setVisibleL(true)
        setVisibleC(false);
      }}
      />

      <Container >
        <If condition={visibleL}>
          <Then>
            <Container id='chat' >
              <Badge id='headChat'>Your connection</Badge>
              <ListGroup>
                <ChatListView />
              </ListGroup>
            </Container>

            <Icon.XCircle id='closeButton' onClick={() => { setVisibleL(false) }} />
          </Then>
        </If>
        <If condition={visibleC}>
          <Then>
            <Container id='chat' >
              <Badge id='headChat'>{specificName}</Badge>
              <ListGroup >
                <ChatView />
              </ListGroup>
              <Container id='formChat'>
                <Form.Group >
                  <Form.Control id='inputSend' required name="text" onChange={(e) => { setMessage(e.target.value) }} type="text" />
                </Form.Group>
                <Icon.ArrowUpSquareFill id='clickSend' onClick={() => {
                  context.socketMessg.emit('message', { body: message, receiver: secondPartyIId, token: token, type: secondPartyChar })
                  context.socketMessg.emit('checkMsg', { token })
                }} />
              </Container>
            </Container>

            <Icon.ArrowRightSquare id='closeButton' onClick={() => {
              setVisibleL(true)
              setVisibleC(false)
            }} />
          </Then>
        </If>
      </Container>
    </>
  )
}


