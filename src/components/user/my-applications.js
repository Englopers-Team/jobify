import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import superagent from 'superagent';
import './styles.scss';

import { useHistory } from 'react-router-dom';

export default function UserApplications() {
  let history = useHistory();
  const [data, setData] = useState([]);

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com/user/app';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudF90eXBlIjoicCIsInByb2ZpbGUiOnsiaWQiOjEsImZpcnN0IjoiTWFsZWsiLCJsYXN0IjoiQWhtZWQiLCJhdmF0YXIiOiJodHRwczovL2xpYnJhcnkua2lzc2NsaXBhcnQuY29tLzIwMTgwOTI5L29vcS9raXNzY2xpcGFydC1hdmF0YXItcGVyc29uLWNsaXBhcnQtYXZhdGFyLWNvbXB1dGVyLWljb25zLXBlcnNvbi04NzM1NWM1NmExNzQ4NDczLmpwZyIsImNvdW50cnkiOiJVU0EifSwiaWF0IjoxNjA3NjkzMzMxLCJleHAiOjM2MTYwNzY5MzMzMX0.UjxBO5cHePzHJaJcuZgQb-zZ1B_-XAFJYxfsKuUB_ig';
    const response = await superagent.get(`${API}`).set('authorization', `Basic ${token}`);
    console.log(response.body);
    setData(response.body);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container style={{ marginTop: '50px' }}>
        <Container style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '35px', fontWeight: 'bold', color: '#504edf' }}>Recommanded Jobs</h2>
        </Container>
        <Container className='list-container' style={{ marginTop: '20px' }} fluid>
          <Row sm={8} className='flexRow list-header'>
            <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} className='col-title' sm={4}>
              Job Title
            </Col>
            <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
              Company{' '}
            </Col>
            <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
              Location
            </Col>
            <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
              Type
            </Col>
            <Col sm={1}></Col>
            <Col sm={1}></Col>
          </Row>
          {data.map((item) => {
            return (
              <Row className='flexRow list-body' sm={8}>
                <Col style={{ fontWeight: 650 }} sm={4}>
                  {item.title}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                  {item.company_name}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                  {item.location}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                  {item.type}
                </Col>
                <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                  <Button className='button' onClick={console.log(item.email)} variant='praimary'>
                    Save
                  </Button>
                </Col>
                <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                  <Button className='button' style={{ paddingRight: '50px' }} onClick={console.log(item.email)} variant='praimary'>
                    Apply
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Container>
      </Container>
    </>
  );
}
