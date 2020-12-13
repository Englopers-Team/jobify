import { useEffect, useState, useContext } from 'react';
import { Badge, ListGroup, Form, Col, Container, Row, Image, Button } from 'react-bootstrap';
import { SocketContext } from '../../context/socket';
import { AuthContext } from '../../context/auth';

export default function Notification() {
  const context = useContext(SocketContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log('here 0')

    if (authContext.token) {
      console.log('here 1')
      context.socketNotif.emit('join', authContext.token);
      context.socketNotif.on('notification', (payload) => {
        console.log(payload.auth_id, payload.title, payload.description);
      })
      context.socketNotif.emit('checkNotif', { token: authContext.token })
    }

    // return () => {
    //   context.socketNotif.off('notification');
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.token]);

  return (
    <></>
  )
}