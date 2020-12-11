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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState('');
  const [url, setURL] = useState('');
  const [error, setError] = useState(false);

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
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#6D6D6D' }}>Sign up</Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '23%' }} />

            <Row style={{ justifyContent: 'center', marginTop: '30px', display: 'flex', flexDirection: 'row' }}>
              <Form style={{ width: '80%' }}>
                <Row style={{ margin: '20px' }}>
                  <Form.Group style={{ marginBottom: '15px' }}>
                    <Form.Control required className='input' type='text' placeholder='First name' />
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '15px' }}>
                    <Form.Control required value={data.last_name} className='input' type='text' placeholder='Last name' />
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '15px' }} controlId='formBasicEmail'>
                    <Form.Control required value={data.phone} className='input' type='email' placeholder='Email' />
                  </Form.Group>
                </Row>
                <Row style={{ margin: '20px' }}>
                  <Form.Group style={{ marginBottom: '15px' }}>
                    <Form.Control required value={data.avatar} className='input' type='number' placeholder='Phone number' />
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '15px' }}>
                    <Form.Control required value={data.cv} className='input' type='text' placeholder='Job title' />
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '15px' }}>
                    <Form.Control required value={data.job_title} className='input' type='text' placeholder='Country' />
                  </Form.Group>
                </Row>
                <Row>
                  <Button variant='outline-dark' size='lg' className='button' block type='submit' style={{ marginBottom: '50px', height: '40px', fontSize: '24px', fontWeight: '500' }}>
                    Sign up
                  </Button>
                </Row>
              </Form>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
