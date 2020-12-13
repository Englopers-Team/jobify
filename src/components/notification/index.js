import { useEffect, useState, useContext } from 'react';
import { Badge, ListGroup, Form, Col, Container, Row, Image, Button } from 'react-bootstrap';
import { SocketContext } from '../../context/socket';

export default function Notification() {
  const context = useContext(SocketContext);

  useEffect(() => {
    if (context.token) {
      console.log('here 1')
      context.socketNotif.emit('join', context.token);
      context.socketNotif.on('notification', (payload) => {
        console.log(payload.auth_id, payload.title, payload.description);
      })
      context.socketNotif.emit('checkNotif', { token: context.token })
    }

    // return () => {
    //   context.socketNotif.off('notification');
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token]);
  return (
    <></>
  )
}