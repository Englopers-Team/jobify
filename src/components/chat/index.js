import { useEffect, useState, useContext } from 'react';
import { Image, ListGroup, Form, Button } from 'react-bootstrap';

import { If, Then } from 'react-if';
import { SocketContext } from '../../context/socket';

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

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudF90eXBlIjoiYyIsImlhdCI6MTYwNzU5MTg0NCwiZXhwIjozNjE2MDc1OTE4NDR9.YBAwMYCx-_2OPcSs8H7w5FoHW_179Zaset_uWv6YqgQ';
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
      return (
        <ListGroup.Item key={index}>
          {mesg.body}
        </ListGroup.Item>
      )
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
      <Image onClick={() => { setVisibleL(true) }} src="holder.js/171x180" rounded />
      <If condition={visibleL}>
        <Then>
          <Button onClick={() => { setVisibleL(false) }}>X</Button>
          <ListGroup>
            <ChatListView />
          </ListGroup>
        </Then>
      </If>
      <If condition={visibleC}>
        <Then>
          <Button onClick={() => {
            setVisibleL(true)
            setVisibleC(false)
          }}>Xt</Button>
          <ListGroup>
            <ChatView />
          </ListGroup>
        </Then>
      </If>

      <Form.Group >
        <Form.Control required name="text" onChange={(e) => { setMessage(e.target.value) }} type="text" />
      </Form.Group>
      <Button onClick={() => {
        context.socketMessg.emit('message', { body: message, receiver: secondPartyIId, token: token, type: secondPartyChar })
        context.socketMessg.emit('checkMsg', { token })
      }}>Send</Button>
    </>
  )
}
