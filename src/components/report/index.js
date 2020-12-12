import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav, Modal, Spinner } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { If, Then } from 'react-if';
import superagent from 'superagent';
import './styles.scss';

import { useHistory } from 'react-router-dom';

export default function Report() {
  let history = useHistory();
  const [data, setData] = useState({});

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudF90eXBlIjoicCIsInByb2ZpbGUiOnsiaWQiOjEsImZpcnN0IjoiTWFsZWsiLCJsYXN0IjoiQWhtZWQiLCJhdmF0YXIiOiJodHRwczovL2xpYnJhcnkua2lzc2NsaXBhcnQuY29tLzIwMTgwOTI5L29vcS9raXNzY2xpcGFydC1hdmF0YXItcGVyc29uLWNsaXBhcnQtYXZhdGFyLWNvbXB1dGVyLWljb25zLXBlcnNvbi04NzM1NWM1NmExNzQ4NDczLmpwZyIsImNvdW50cnkiOiJVU0EifSwiaWF0IjoxNjA3NjkzMzMxLCJleHAiOjM2MTYwNzY5MzMzMX0.UjxBO5cHePzHJaJcuZgQb-zZ1B_-XAFJYxfsKuUB_ig';
    const response = await superagent.get(`${API}/reports`).set('authorization', `Basic ${token}`);
    console.log(response.body);
    setData(response.body);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container sm={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Row sm={6}>
        {data.map((item) => {
          let state = 'Closed';
          let response = item.response;
          if (item.response == null) {
            state = 'Open';
            response = '';
          }
          return (
            <Row style={{ display: 'flex', flexDirection: 'column' }}>
              <Row style={{ display: 'flex', flexDirection: 'row' }}>
                <Col>{item.id}</Col>
                <Col>{state}</Col>
              </Row>
              <Row style={{ display: 'flex', flexDirection: 'column' }}>
                <Col>{item.description}</Col>
                <Col>{response}</Col>
              </Row>
            </Row>
          );
        })}
      </Row>
      <Row sm={6}></Row>
    </Container>
  );
}
