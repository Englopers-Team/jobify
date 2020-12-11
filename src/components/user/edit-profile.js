import superagent from 'superagent';

import Results from '../search/jobs/results';

import * as Icon from 'react-bootstrap-icons';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav } from 'react-bootstrap';
import { If } from 'react-if';
import './styles.scss';
import { useHistory } from 'react-router-dom';

export default function UserEdit() {
  const [data, setData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [cv, setCv] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudF90eXBlIjoicCIsInByb2ZpbGUiOnsiaWQiOjEsImZpcnN0IjoiTWFsZWsiLCJsYXN0IjoiQWhtZWQiLCJhdmF0YXIiOiJodHRwczovL2xpYnJhcnkua2lzc2NsaXBhcnQuY29tLzIwMTgwOTI5L29vcS9raXNzY2xpcGFydC1hdmF0YXItcGVyc29uLWNsaXBhcnQtYXZhdGFyLWNvbXB1dGVyLWljb25zLXBlcnNvbi04NzM1NWM1NmExNzQ4NDczLmpwZyIsImNvdW50cnkiOiJVU0EifSwiaWF0IjoxNjA3NjkzMzMxLCJleHAiOjM2MTYwNzY5MzMzMX0.UjxBO5cHePzHJaJcuZgQb-zZ1B_-XAFJYxfsKuUB_ig';
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${token}`);
    setData(response.body);
  }

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Row style={{ justifyContent: 'center' }}>
        <Col sm={8}>
          <Card style={{ padding: '6%', boxShadow: '0 0 10px #888888', borderRadius: '10px' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#6D6D6D' }}>{data.first_name} Profile </Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '23%' }} />

            <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
              <Form style={{ width: '80%' }}>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setFirstName(e.target.value)} className='input' type='text' value={data.first_name} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setLastName(e.target.value)} className='input' type='text' value={data.last_name} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }} controlId='formBasicEmail'>
                  <Form.Control required onChange={(e) => setPhone(e.target.value)} className='input' type='email' value={data.phone} />
                </Form.Group>

                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setJobTitle(e.target.value)} className='input' type='number' value={data.job_title} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setCv(e.target.value)} className='input' type='text' value={data.cv} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setAvatar(e.target.value)} className='input' type='text' value={data.avatar} />
                </Form.Group>

                <Button variant='outline-dark' size='lg' className='button' block type='submit' style={{ marginBottom: '50px', height: '40px', fontSize: '24px', fontWeight: '500' }}>
                  Save
                </Button>
              </Form>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
