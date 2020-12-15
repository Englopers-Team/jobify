import React, { useState, useContext } from 'react';
import '../styles.scss';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../../context/auth';
import Results from './results';
import * as Icon from 'react-bootstrap-icons';
import offersImg from './offers.svg'
const jobsApi = 'https://jobify-app-v2.herokuapp.com/search/employee';

export default function SearchEmployees() {
  const context = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [visable, setVisable] = useState('false');
  const [loader, setLoader] = useState(false);

  const jobList = async (e) => {
    e.preventDefault();
    setLoader(true);
    setVisable(true);
    await superagent
      .get(jobsApi)
      .set({ Authorization: `Basic ${context.token}` })
      .query({ job_title: title, country: location })
      .then((data) => {
        setResults(data.body);
        data.body[0] ? setVisable('true') : setVisable('noData');
        setLoader(false);
      });
  };

  return (
    <Container style={{ justifyContent: 'center' }}>
      <Form onSubmit={jobList}>
        <br></br>
        <Row sm={10} className='search-container' style={{ width: '75%', textAlign: 'center' }}>
          <Col sm={5} className='input-filed'>
            <Icon.EnvelopeFill className='icon' />

            <Form.Control className='input' required name='title' type='text' onChange={(e) => setTitle(e.target.value)} placeholder='Job Title' />
          </Col>
          <Col sm={5} className='input-filed'>
            <Icon.GeoAltFill className='icon' />
            <Form.Control className='input' required name='location' type='text' onChange={(e) => setLocation(e.target.value)} placeholder='Country' />
          </Col>

          <Col sm={2}>
            <Button variant='outline-dark' className='button' type='submit'>
              <Icon.Search size='20' />
            </Button>
          </Col>
        </Row>
      </Form>
      <Row style={{ justifyContent: 'center' }}>
        <Results results={results} visable={visable} loader={loader} />
      </Row>

      <Row className='image-container' style={{ justifyContent: 'center' }}>
        <Image className='image' style={{ width: '70%' }} src={offersImg  } rounded />
      </Row>
    </Container>
  );
}
