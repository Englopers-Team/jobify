import React, { useState } from 'react';
import '../styles.scss';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Results from './results';
import * as Icon from 'react-bootstrap-icons';
const jobsApi = 'https://jobify-app-v2.herokuapp.com/search/employee';

export default function SearchEmployees() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [visable, setVisable] = useState(false);
  const [loader, setLoader] = useState(false);

  const jobList = async (e) => {
    e.preventDefault();
    setLoader(true);
    setVisable(true);

    await superagent
      .get(jobsApi)
      .set({ Authorization: 'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudF90eXBlIjoiYyIsInByb2ZpbGUiOnsiaWQiOjEsIm5hbWUiOiJEZW1vIENvbXBhbnkiLCJsb2dvIjoiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL3N2Zy9zdGF0aWMvaWNvbnMvc3ZnLzk5My85OTM4OTEuc3ZnIiwiY291bnRyeSI6IlVTQSJ9LCJpYXQiOjE2MDc2Mzc2MDYsImV4cCI6MzYxNjA3NjM3NjA2fQ.lCGfnwvcdkHNOC4R530VVC99YlENts_h9FSND3B67dY' })
      .query({ job_title: title, country: location })

      .then((data) => {
        console.log('fffffff', data.body);
        setResults(data.body);
        setLoader(false);
      });
  };
  console.log(results);

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
        <Image className='image' style={{ width: '70%' }} src='../../assets/search.png' rounded />
      </Row>
    </Container>
  );
}
