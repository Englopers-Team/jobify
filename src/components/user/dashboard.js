import React, { useState, useEffect, useContext } from 'react';
import './styles.scss';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Results from '../search/jobs/results';
import { AuthContext } from '../../context/auth';

import * as Icon from 'react-bootstrap-icons';
const jobsApi = 'https://jobify-app-v2.herokuapp.com/search/job';
const userApi = 'https://jobify-app-v2.herokuapp.com/home';

export default function UserDashboard() {
  const context = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [visable, setVisable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [sugJobs, setSugJobs] = useState([]);
  const [App, setApp] = useState(0);
  const [Offers, setoffers] = useState(0);

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
  async function userStatistics() {
    await superagent
      .get(userApi)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        setSugJobs([...data.body.suggJob.resultAPI, ...data.body.suggJob.resultDB]);
        setApp(data.body.numOfApp);
        setoffers(data.body.numOfOffer);
        console.log('fffffff', data.body);
      });
  }
  useEffect(() => {
    if (context.token) {
      userStatistics();
    }
  }, [context.token]);
  return (
    <Container>
      <Container style={{ textAlign: 'center' }}>
        <Form onSubmit={jobList}>
          <br></br>
          <Row style={{ display: 'flex', flexDirection: 'row' }}>
            <Row style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
              <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', marginLeft: '5px' }}>
                <h2 style={{ textAlign: 'left', fontSize: '45px', fontWeight: 'bold' }}>Lets find your</h2>
                <h2 style={{ textAlign: 'left', fontSize: '45px', fontWeight: 'bold' }}>
                  Dream <span style={{ color: '#504edf', fontSize: '45px', fontWeight: 'bold' }}>Job</span>
                </h2>
                <h3 style={{ color: '#ababab', marginTop: '15px', marginBottom: '15px' }}>We have What you are looking for</h3>
              </Row>
              <Row sm={6} className='search-container' style={{ width: 'fit-content', justifyContent: 'flex-start', margin: 0, height: 'fit-content' }}>
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
            </Row>
            <Row style={{ width: '40%', justifyContent: 'flex-end' }}>
              <Image className='image' style={{ width: '100%' }} src='../../assets/user.png' rounded />
            </Row>
          </Row>
          <Row>
            <Results results={results} visable={visable} loader={loader} />
          </Row>
        </Form>
      </Container>
      <Container style={{ textAlign: 'center', marginTop: '50px', marginBottom: '100px' }}>
        <Row style={{ display: 'flex', flexDirection: 'column' }} sm={8}>
          <Col style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '35px', fontWeight: 'bold', color: '#ababab' }}>
              You have applied for <span style={{ fontSize: '35px', fontWeight: 'bold', color: '#504edf' }}>{App}</span> Jobs
            </h2>
          </Col>
          <Col style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '35px', fontWeight: 'bold', color: '#ababab' }}>
              You have recevied <span style={{ fontSize: '35px', fontWeight: 'bold', color: '#504edf' }}>{Offers}</span> Offers
            </h2>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: '50px' }}>
        <Container style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '35px', fontWeight: 'bold', color: '#504edf' }}>Recommanded Jobs</h2>
        </Container>
        <Container className='list-container' style={{ marginTop: '20px' }} fluid>
          <Row sm={8} className='flexRow list-header'>
            <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} className='col-title' sm={4}>
              Job Title
            </Col>
            <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
              Company{' '}
            </Col>
            <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
              Location
            </Col>
            <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
              Type
            </Col>
            <Col sm={1}></Col>
            <Col sm={1}></Col>
          </Row>
          {sugJobs.map((item) => {
            return (
              <Row className='flexRow list-body' sm={8}>
                <Col style={{ fontWeight: 650 }} sm={4}>
                  {item.title}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                  {item.company_name}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                  {item.location}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                  {item.type}
                </Col>
                <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                  <Button className='button' onClick={console.log(item.email)} variant='praimary'>
                    Save
                  </Button>
                </Col>
                <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                  <Button className='button' style={{ paddingRight: '50px' }} onClick={console.log(item.email)} variant='praimary'>
                    Apply
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Container>
      </Container>
    </Container>
  );
}
