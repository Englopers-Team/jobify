import React, { useContext, useState, useEffect } from 'react';
import './styles.scss';
import superagent from 'superagent';
import { Image, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { If, Then, Else } from 'react-if';
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import defaultAvatar from './avatar.jpg';
export default function CompanyDashboard() {
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState(defaultAvatar);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [applications, setApplications] = useState([[], '']);
  const [jobsData, setJobs] = useState([[], '']);
  const [offers, setOffers] = useState([[], '']);

  const API = 'https://jobify-app-v2.herokuapp.com';
  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  const context = useContext(AuthContext);
  useEffect(() => {
    window.addEventListener('resize', checkSize);
    if (context.token) {
      getData();
    }

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [screenSize]);

  useEffect(() => {
    if (context.token) {
      appList();
      getData();
      savedJobs();
      offersList();
    }
  }, [context.token]);

  async function getData() {
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${context.token}`);
    setUserName(`${response.body.first_name} ${response.body.last_name}`);
    setTitle(response.body.job_title);
    setLogo(response.body.avatar);
    setLocation(response.body.country);
  }

  const appList = async () => {
    superagent
      .get(`${API}/user/app`)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        data.body !== null ? setApplications([[...data.body.API.slice(0, 2), ...data.body.DB.slice(0, 3)], data.body.DB.length + data.body.API.length]) : setApplications([[...data.body.DB, ...data.body.API], data.body.API.length + data.body.DB.length]);
      });
  };

  const savedJobs = async () => {
    superagent
      .get(`${API}/user/saved`)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        data.body[0] !== null ? setJobs([[...data.body.data_Api.slice(0, 2), ...data.body.data_DB.slice(0, 3)], data.body.data_DB.length + data.body.data_Api.length]) : setJobs([data.body, 0]);
      });
  };

  const offersList = async () => {
    superagent
      .get(`${API}/user/offers`)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        data.body !== null ? setOffers([data.body.slice(0, 4), data.body.length]) : setOffers([data.body, data.body.length]);
      });
  };

  return (
    <>
      <Container className='content' style={{ margin: '40px auto' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504edf', borderLeftWidth: '5px', paddingLeft: '8px', marginBottom: 30 }}>
            <h2 style={{ color: '#504edf', fontSize: '45px', fontWeight: 'bold' }}>
              Applicant <span style={{ color: '#515151', fontSize: '45px', fontWeight: 'bold' }}>Dashboard</span>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col md='4'>
            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              Profile
            </CardTitle>
            <Card className='card-user'>
              <div className='image'>
                <img alt='...' style={{ width: '100%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} src='https://i.pinimg.com/736x/28/97/6a/28976a5b8f37b6ca3664129858fd2508.jpg' />
              </div>
              <CardBody>
                <div className='author'>
                  <img alt='...' className='avatar border-gray' src={logo} />
                  <h5 style={{ fontWeight: 600, fontSize: 30 }} className='title'>
                    {userName}
                  </h5>
                  <p className='description'>
                    {title}, {location}
                  </p>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className='button-container'>
                  <Row>
                    <Col className='m-auto' lg='4' md='6' xs='6'>
                      <h5>
                        <small>Offers</small>
                        <br />
                        {offers[1]}
                      </h5>
                    </Col>
                    <Col className='mr-auto' lg=''>
                      <h5>
                        <small>Saved Jobs</small>
                        <br />
                        {jobsData[1]}
                      </h5>
                    </Col>
                    <Col className='ml-auto mr-auto' lg='4' md='6' xs='6'>
                      <h5>
                        <small style={{ fontWeight: 550 }}>#of Apps</small>
                        <br />
                        {applications[1]}
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
            <CardTitle style={{ margin: '7px 0', textAlign: 'center', marginTop: '40px' }} tag='h4'>
              Recent Offers
            </CardTitle>
            <Card className='reports' md='4'>
              <CardBody>
                <ul className='list-unstyled team-members'>
                  {offers[0].map((item, index) => {
                    return (
                      <li key={index}>
                        <Row>
                          <Col md='12' xs='12'>
                            {item.company_name},&nbsp;{item.title} <br />
                            <span className='text-muted'>
                              <small style={{ fontWeight: '600', fontSize: '14px', color: item.status === 'Accepted' ? '#69D95B' : item.status === 'Rejected' ? '#B72525' : '#515151' }}>{item.status}</small>
                            </span>
                          </Col>
                        </Row>
                      </li>
                    );
                  })}
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col md='8'>
            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              Recent Applications
            </CardTitle>
            <Card className='two'>
              <CardHeader style={{ paddingTop: 25 }}>
                <Row className='flexRow list-header' sm={12} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={1} lg={1}>
                    <p>#</p>
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={4} lg={4}>
                    <p>Company</p>
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2} lg={2}>
                    <p>Title</p>
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                    <p>Location</p>
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={3} lg={3}>
                    <p>Status</p>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {applications[0].map((item, index) => {
                  return (
                    <Row key={index} className='flexRow list-body-one' sm={12} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center' }} sm={1} lg={1}>
                        {index + 1}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151', fontWeight: 650 }} sm={4} lg={4}>
                        {item.company_name}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2} lg={2}>
                        {item.title}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                        {item.location}
                      </Col>
                      <Col style={{ textAlign: 'center', fontWeight: '600', color: item.status === 'Pending' ? '#515151' : item.status === 'Rejected' ? '#B72525' : '#69D95B' }} sm={3} lg={3}>
                        {item.status === 'Pending' ? 'Pending' : item.status}
                      </Col>
                    </Row>
                  );
                })}
              </CardBody>
            </Card>
            <CardTitle style={{ margin: '9px 0', textAlign: 'center', marginTop: '40px' }} tag='h4'>
              Saved Jobs
            </CardTitle>
            <Card className='two'>
              <CardHeader style={{ paddingTop: 25 }}>
                <Row className='flexRow list-header2' sm={12} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={1} lg={1}>
                    <p>#</p>
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={4} lg={4}>
                    <p>Title</p>
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2} lg={2}>
                    <p>Type</p>
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={3} lg={2}>
                    <p>Location</p>
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                    <p>Phone</p>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {jobsData[0].map((item, index) => {
                  return (
                    <Row key={index} className='flexRow list-body-one' sm={12} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={1} lg={1}>
                        {index + 1}
                      </Col>
                      <Col style={{ verticalAlign: 'center', fontWeight: 650, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={4} lg={4}>
                        {item.title.slice(0, 25)}
                        {item.title.length > 25 ? '...' : ''}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2} lg={2}>
                        {item.type}&nbsp;{item.last_name}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={3} lg={2}>
                        {item.location}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                        {item.phone ? item.phone : 'No Phone Number'}
                      </Col>
                    </Row>
                  );
                })}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center', margin: 40 }}>
          <Image style={{ width: '70%' }} src='../../assets/undraw_Charts_re_5qe9.svg'></Image>
        </Row>
      </Container>
    </>
  );
}
