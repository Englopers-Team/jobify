import React, { useState } from 'react';

import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Results from './results';

const jobsApi = 'https://jobify-app-v2.herokuapp.com/search/job';

export default function SearchJobs() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const jobList = async (e) => {
    e.preventDefault();

    await superagent
      .get(jobsApi)
      .query({ title: title, location: location })

      .then((data) => {
        setResults([...data.body.resultDB, ...data.body.resultAPI]);
      });
  };
  console.log(results);

  return (
    <Container>
      <Form onSubmit={jobList}>
        <Row>
          <Col>
            <Form.Control required name='title' type='text' onChange={(e) => setTitle(e.target.value)} placeholder='Job Title' />
          </Col>
          <Col>
            <Form.Control required name='location' type='text' onChange={(e) => setLocation(e.target.value)} placeholder='Country' />
          </Col>

          <Button type='submit' variant='secondary'>
            search
          </Button>
        </Row>
        <Row>
          <Results results={results} />
        </Row>
      </Form>
    </Container>
  );
}
