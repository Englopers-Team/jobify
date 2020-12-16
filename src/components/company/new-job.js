import superagent from 'superagent';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { If, Else } from 'react-if';
import './styles.scss';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';

export default function SubmitJob() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-Time');
  const [description, setDescription] = useState('');
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const context = useContext(AuthContext);

  const API = 'https://jobify-app-v2.herokuapp.com';

  async function handleSubmit(e) {
    setLoader(true);
    e.preventDefault();
    await superagent.post(`${API}/company/submit`).set('authorization', `Basic ${context.token}`).send({ title: title, location: location, type: type, description: description });
    setLoader(false);
    history.push('/company/submitted-jobs');
  }

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px', justifyContent: 'center', width: '85%' }}>
      <Row sm={8}>
        <Col style={{ color: '#515151', fontSize: 40, fontWeight: 700, textAlign: 'center', marginBottom: '30px' }}>Add New Job</Col>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Col sm={8}>
          <Card style={{ padding: '6%', boxShadow: '0 0 10px #888888', borderRadius: '10px' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#515151' }}>New Job </Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '23%' }} />

            <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
              <Form onSubmit={(e) => handleSubmit(e)} style={{ width: '80%' }}>
                <Form.Group style={{ marginBottom: '45px' }}>
                  {/* <Form.Label>Title</Form.Label> */}
                  <Form.Control placeholder='Job Title' required onChange={(e) => setTitle(e.target.value)} className='input' type='text' value={title} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '45px' }}>
                  {/* <Form.Label>Location</Form.Label> */}
                  <Form.Control placeholder='Location' required onChange={(e) => setLocation(e.target.value)} className='input' type='text' value={location} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '45px' }}>
                  {/* <Form.Label>Type</Form.Label> */}
                  <Form.Control placeholder='Job Type' as='select' required onChange={(e) => setType(e.target.value)} className='input' value={type}>
                    <option value='Full-Time'>Full Time</option>
                    <option value='Part-Time'>Part Time</option>
                    <option value='Remote'>Remote</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group style={{ marginBottom: '45px' }}>
                  {/* <Form.Label>Description</Form.Label> */}
                  <Form.Control placeholder='Description' required onChange={(e) => setDescription(e.target.value)} className='input' type='text' value={description} />
                </Form.Group>

                <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center', height: 50 }} sm={1.5}>
                  <If condition={loader}>
                    <Spinner animation='border' variant='primary' />
                    <Else>&nbsp; &nbsp; &nbsp; &nbsp; </Else>
                  </If>
                </Col>
                <Button variant='outline-dark' size='lg' className='button' block type='submit' style={{ marginBottom: '40px', marginTop: 0, height: '40px', fontSize: '24px', fontWeight: '500', paddingBottom: 40 }}>
                  Submit
                </Button>
              </Form>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
