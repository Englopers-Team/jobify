import superagent from 'superagent';

import Results from '../search/jobs/results';

import * as Icon from 'react-bootstrap-icons';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav } from 'react-bootstrap';
import { If, Else } from 'react-if';
import './styles.scss';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';

export default function CompanyEdit() {
  const [data, setData] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');
  const [country, setCountry] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [loader, setLoader] = useState(false);
  let history = useHistory();

  useEffect(() => {
    getData();
  }, []);
  const API = 'https://jobify-app-v2.herokuapp.com';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudF90eXBlIjoiYyIsInByb2ZpbGUiOnsiaWQiOjEsIm5hbWUiOiJEZW1vIENvbXBhbnkiLCJsb2dvIjoiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL3N2Zy9zdGF0aWMvaWNvbnMvc3ZnLzk5My85OTM4OTEuc3ZnIiwiY291bnRyeSI6IlVTQSJ9LCJpYXQiOjE2MDc3MzMwNjIsImV4cCI6MzYxNjA3NzMzMDYyfQ.4m57l6B3uXRcUpylAEzUAdfNx0E3xTuh9SukCEtZuX8';
  async function getData() {
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${token}`);
    console.log(response.body);
    setData(response.body);
    setCompanyName(response.body.company_name);
    setPhone(response.body.phone);
    setLogo(response.body.logo);
    setCountry(response.body.country);
    setCompanyUrl(response.body.company_url);
  }
  async function handleSubmit(e) {
    setLoader(true);
    e.preventDefault();
    await superagent.put(`${API}/company/edit`).set('authorization', `Basic ${token}`).send({ company_name: companyName, phone: phone, logo: logo, country: country, company_url: companyUrl });
    setLoader(false);
    history.push('/');
  }

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Row style={{ justifyContent: 'center' }}>
        <Col sm={8}>
          <Card style={{ padding: '6%', boxShadow: '0 0 10px #888888', borderRadius: '10px' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#6D6D6D' }}>{data.company_name} Profile </Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '23%' }} />

            <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
              <Form onSubmit={(e) => handleSubmit(e)} style={{ width: '80%' }}>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setCompanyName(e.target.value)} className='input' type='text' value={companyName} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setPhone(e.target.value)} className='input' type='text' value={phone} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setLogo(e.target.value)} className='input' type='text' value={logo} />
                </Form.Group>

                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setCountry(e.target.value)} className='input' type='text' value={country} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setCompanyUrl(e.target.value)} className='input' type='text' value={companyUrl} />
                </Form.Group>

                <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center', height: 50 }} sm={1.5}>
                  <If condition={loader}>
                    <Spinner animation='border' variant='primary' />
                    <Else>&nbsp; &nbsp; &nbsp; &nbsp; </Else>
                  </If>
                </Col>
                <Button variant='outline-dark' size='lg' className='button' block type='submit' style={{ marginBottom: '40px', marginTop: 50, height: '40px', fontSize: '24px', fontWeight: '500' }}>
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
