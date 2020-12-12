import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav, Modal, Spinner } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { If, Then } from 'react-if';
import superagent from 'superagent';
import './styles.scss';

import { useHistory } from 'react-router-dom';

export default function Report() {
  let history = useHistory();
  const [data, setData] = useState([]);

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudF90eXBlIjoicCIsInByb2ZpbGUiOnsiaWQiOjEsImZpcnN0Ijoib3NhbWEiLCJsYXN0IjoiemF0YXIiLCJhdmF0YXIiOiJodHRwczovL2xpYnJhcnkua2lzc2NsaXBhcnQuY29tLzIwMTgwOTI5L29vcS9raXNzY2xpcGFydC1hdmF0YXItcGVyc29uLWNsaXBhcnQtYXZhdGFyLWNvbXB1dGVyLWljb25zLXBlcnNvbi04NzM1NWM1NmExNzQ4NDczLmpwZyIsImpvYl90aXRsZSI6IkRldmVsb3BlciIsImNvdW50cnkiOiJVU0EifSwiaWF0IjoxNjA3ODA4OTkyLCJleHAiOjM2MTYwNzgwODk5Mn0.N9ei6Q3kG4QNBXmDb4qGVDt0L_2HGk78VdJXTcjuvxY';
    const response = await superagent.get(`${API}/reports`).set('authorization', `Basic ${token}`);
    console.log('osamamamamamamammama', response.body);
    setData(response.body);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
      <Col style={{ justifyContent: 'flex-start' }} sm={6}>
        {data.map((item) => {
          let state = 'Closed';
          let response = item.response;
          if (item.response == null) {
            state = 'Open';
            response = '';
          }
          return (
            <Container style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', border: 'solid 1px red', padding: '0' }}>
              <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Col style={{ padding: '0', textAlign: 'center' }}>{item.id}</Col>
                <Col style={{ padding: '0', textAlign: 'center' }}>{state}</Col>
              </Row>
              <Row>
                <Col style={{ padding: '0', textAlign: 'center' }}>{item.description}</Col>
              </Row>
              <Row>
                <Col style={{ padding: '0', textAlign: 'center' }}>{response}</Col>
              </Row>
            </Container>
          );
        })}
      </Col>
      <Col>
        <Row></Row>
      </Col>
    </Container>
  );
}
