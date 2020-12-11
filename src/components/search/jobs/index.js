import React, { useState } from 'react';
import '../styles.scss';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Results from './results';
import * as Icon from 'react-bootstrap-icons';
const jobsApi = 'https://jobify-app-v2.herokuapp.com/search/job';

export default function SearchJobs() {
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
      .query({ title: title, location: location })

      .then((data) => {
        setResults([...data.body.resultDB, ...data.body.resultAPI]);
        setLoader(false);
      });
  };
  console.log(results);

  return (
    <Container>
      <Form onSubmit={jobList}>
        <br></br>
        <Row sm={8} className='search-container'>
          <Col sm={4} className='input-filed'>
            <Icon.EnvelopeFill className='icon' />

            <Form.Control className='input' required name='title' type='text' onChange={(e) => setTitle(e.target.value)} placeholder='Job Title' />
          </Col>
          <Col sm={4} className='input-filed'>
            <Icon.GeoAltFill className='icon' />
            <Form.Control className='input' required name='location' type='text' onChange={(e) => setLocation(e.target.value)} placeholder='Country' />
          </Col>
          <Col sm={3} className='input-filed'>
            <Form.Control className='input' required name='category' type='text' placeholder='Category' />
          </Col>
          <Col sm={1}>
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
        <Image className='image' style={{ width: '90%' }} src='../../assets/search.png' rounded />
      </Row>
    </Container>
  );
}
