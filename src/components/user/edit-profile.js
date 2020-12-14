/* eslint-disable no-unused-vars */
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
  let history = useHistory();
  const context = useContext(AuthContext);

  const [data, setData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [cv, setCv] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (context.token) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token]);

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${context.token}`);
    setData(response.body);
    setFirstName(response.body.first_name);
    setLastName(response.body.last_name);
    setPhone(response.body.phone);
    setJobTitle(response.body.job_title);
    setCv(response.body.cv);
    setAvatar(response.body.avatar);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const API = 'https://jobify-app-v2.herokuapp.com/user/edit';
    await superagent.put(`${API}`).set('authorization', `Basic ${context.token}`).send({ first_name: firstName, last_name: lastName, phone: phone, job_title: jobTitle, country: data.country, age: data.age, avatar: avatar, experince: data.experince, cv: cv });
    history.push('/userhome');
  }

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Row style={{ justifyContent: 'center' }}>
        <Col sm={8}>
          <Card style={{ padding: '6%', boxShadow: '0 0 10px #888888', borderRadius: '10px' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#6D6D6D' }}>{data.first_name} Profile </Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '23%' }} />

            <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
              <Form onSubmit={(e) => handleSubmit(e)} style={{ width: '80%' }}>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setFirstName(e.target.value)} className='input' type='text' value={firstName} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setLastName(e.target.value)} className='input' type='text' value={lastName} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }} controlId='formBasicEmail'>
                  <Form.Control required onChange={(e) => setPhone(e.target.value)} className='input' type='number' value={phone} />
                </Form.Group>

                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setJobTitle(e.target.value)} className='input' type='text' value={jobTitle} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setCv(e.target.value)} className='input' type='text' value={cv} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setAvatar(e.target.value)} className='input' type='text' value={avatar} />
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
