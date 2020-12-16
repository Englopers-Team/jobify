import React, { useState } from 'react';
import '../styles.scss';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Results from './results';
import * as Icon from 'react-bootstrap-icons';
const jobsApi = 'https://jobify-app-v2.herokuapp.com/search/company';

export default function SearchCompany() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [visable, setVisable] = useState(false);
  const [loader, setLoader] = useState(false);
  const jobList = async (e) => {
    e.preventDefault();
    setLoader(true);

    await superagent
      .get(jobsApi)
      .query({ company_name: name, country: location })
      .then((data) => {
        setResults(data.body);
        setLoader(false);
        // setTimeout(() => {
        setVisable(true);
        // }, 10000);
      });
  };

  return (
    <Container style={{ justifyContent: 'center' }}>
      <Form onSubmit={jobList}>
        <br></br>
        <Row className='search-container' style={{ width: '75%', textAlign: 'center' }}>
          <Col sm={5} className='input-filed'>
            <Icon.EnvelopeFill className='icon' />

            <Form.Control className='input' required name='company' type='text' onChange={(e) => setName(e.target.value)} placeholder='Company name' />
          </Col>
          <Col sm={5} className='input-filed'>
            <Icon.GeoAltFill className='icon' />
            <Form.Control className='input' required name='location' type='text' onChange={(e) => setLocation(e.target.value)} placeholder='Location' />
          </Col>

          <Col sm={2}>
            <Button variant='outline-dark' className='button' type='submit'>
              <Icon.Search size='20' />
            </Button>
          </Col>
        </Row>
        <Row>
          <Results results={results} visable={visable} loader={loader} />
        </Row>
      </Form>

      <Row className='image-container' style={{ justifyContent: 'center' }}>
        <Image className='image' style={{ width: '70%' }} src='../../assets/search.png' rounded />
      </Row>
    </Container>
  );
}
