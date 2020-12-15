import React, { useContext, useState, useEffect } from 'react';
import './styles.scss';
import superagent from 'superagent';
// import Form from 'react-bootstrap/Form';
// import { Container, Row, Col } from 'react-bootstrap';
import { Image, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './styles.scss';
import { Nav, Navbar, NavDropdown, Spinner } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { If, Then, Else } from 'react-if';
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Input, Row, Col } from 'reactstrap';
const jobsApi = 'https://jobify-app-v2.herokuapp.com/search/company';
export default function CompanyDashboard() {
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState('');
  const [notification, setNotification] = useState([]);
  const [loader, setLoader] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [applications, setApplications] = useState([[], '']);
  const [jobsData, setJobs] = useState([[], '']);
  const [offers, setOffers] = useState([[], '']);

  const [seen, setSeen] = useState('');
  const [flag, setFlag] = useState('');

  const API = 'https://jobify-app-v2.herokuapp.com';
  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  const context = useContext(AuthContext);
  const history = useHistory();
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
      jobList();
      offersList();
    }
  }, [context.token]);

  async function getData() {
    const flagData = await superagent.get(`${API}/flag`);
    setFlag(flagData.body);
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${context.token}`);
    setCompanyName(response.body.company_name);
    setLogo(response.body.logo);
    const data = await superagent.get(`${API}/home`).set('authorization', `Basic ${context.token}`);
    setNotification(data.body.notifications);
    data.body.notifications[0] ? setSeen(data.body.notifications[data.body.notifications.length - 1].seen) : setSeen(true);
  }

  const appList = async (e) => {
    superagent
      .get(`${API}/company/app`)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        data.body[0] !== null ? setApplications([data.body.slice(0, 5), data.body.length]) : setApplications([data.body, data.body.length]);
      });
  };

  const jobList = async (e) => {
    superagent
      .get(`${API}/company/jobs`)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        data.body[0] !== null ? setJobs([data.body.slice(0, 5), data.body.length]) : setJobs([data.body]);
      });
  };

  const offersList = async () => {
    superagent
      .get(`${API}/company/offers`)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        data.body[0] !== null ? setOffers([data.body.slice(0, 4), data.body.length]) : setOffers([data.body, data.body.length]);
      });
  };

  return (
    <>
      <Container className='content' style={{ margin: '70px auto' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px', marginBottom: 30 }}>
            <h2 style={{ marginBottom: 0 }}>Employer Dashboard</h2>
          </Col>
        </Row>
        <Row>
          <Col md='4'>
            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              Profile
            </CardTitle>
            <Card className='card-user'>
              <div className='image'>
                <img alt='...' style={{ width: '100%' }} src='https://www.kindpng.com/picc/m/150-1500467_interview-clipart-transparent-picture-library-stock-interview-png.png' />
              </div>
              <CardBody>
                <div className='author'>
                  <img alt='...' className='avatar border-gray' src={logo} />
                  <h5 style={{ fontWeight: 600 }} className='title'>
                    {companyName}
                  </h5>
                  {/* <p className='description'>@chetfaker</p> */}
                </div>
                <p className='description text-center'>Amman</p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className='button-container'>
                  <Row>
                    <Col className='ml-auto' lg='4' md='6' xs='6'>
                      <h5>
                        <small>Offers</small>
                        <br />
                        {offers[1]}
                      </h5>
                    </Col>
                    <Col className='ml-auto mr-auto' lg='4' md='6' xs='6'>
                      <h5>
                        <small style={{ fontSize: 12, fontWeight: 550 }}>Applications</small>
                        <br />
                        {applications[1]}
                      </h5>
                    </Col>
                    <Col className='mr-auto' lg='4'>
                      <h5>
                        <small>My Jobs</small>
                        <br />
                        {jobsData[1]}
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
            <CardTitle style={{ margin: '7px 0', textAlign: 'center' }} tag='h4'>
              Recent Offers
            </CardTitle>
            <Card className='reports' md='4'>
              <CardBody>
                <ul className='list-unstyled team-members'>
                  {
                    // console.log(offers[0])

                    offers[0].map((item, index) => {
                      return (
                        <li>
                          <Row>
                            <Col md='7' xs='7'>
                              {item.first_name}&nbsp;{item.last_name} <br />
                              <span className='text-muted'>
                                <small style={{ color: item.status === 'Approved' ? '#B72525' : '#69D95B' }}>{item.status}</small>
                              </span>
                            </Col>
                          </Row>
                        </li>
                      );
                    })
                  }
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col md='8'>
            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              Recent Applications
            </CardTitle>
            <Card className='two'>
              <CardHeader style={{ paddingTop: 25, paddingTop: 15 }}>
                <Row className='flexRow list-header2' sm={12} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2} lg={2}>
                    <p>Photo</p>
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={4} lg={4}>
                    <p>Name</p>
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2} lg={2}>
                    <p>Title</p>
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                    <p>Country</p>
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                    <p>Status</p>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {applications[0].map((item) => {
                  return (
                    <Row className='flexRow list-body' sm={12} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
                      <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2} lg={2}>
                        <Image src={item.avatar} roundedCircle style={{ width: 50, height: 50, objectFit: 'cover' }} />
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={4} lg={4}>
                        {item.first_name}&nbsp;{item.last_name}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2} lg={2}>
                        {item.job_title}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                        {item.country}
                      </Col>
                      <Col style={{ textAlign: 'center', color: item.status === 'Approved' ? '#B72525' : '#69D95B' }} sm={2} lg={2}>
                        {item.status === 'Pending' ? 'Pending' : item.status}
                      </Col>
                    </Row>
                  );
                })}
              </CardBody>
            </Card>
            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              Recent Jobs
            </CardTitle>
            <Card className='two'>
              <CardHeader style={{ paddingTop: 25, paddingTop: 15 }}>
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
                  <Col style={{ textAlign: 'left', color: '#515151' }} sm={3} lg={2}>
                    <p>Location</p>
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                    <p>#of Apps</p>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {jobsData[0].map((item, index) => {
                  return (
                    <Row className='flexRow list-body-one' sm={12} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
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
                        {item.applicants_num}
                      </Col>
                    </Row>
                  );
                })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
