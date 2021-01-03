import React, { useContext, useState, useEffect } from 'react';
import './styles.scss';
import superagent from 'superagent';
import { Image, Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { Link } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import * as Icon from 'react-bootstrap-icons';

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
  const [sammary, setSammary] = useState('');
  // const [experience, setExperience] = useState(['logo', 'title', 'company', 'field', 'start', 'end', 'present', 'location', 'des']);
  // const [education, setEducation] = useState(['logo', 'school', 'degree', 'field', 'starting_date', 'ending_date', 'present', 'grade', 'description']);
  // const [courses, setCourses] = useState(['course_name', 'field', 'course_date', 'school']);
  // const [experience, setExperience] = useState([]);
  // const [education, setEducation] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [data, setData] = useState([]);

  let { id } = useParams();

  const API = 'https://jobify-app-v2.herokuapp.com';
  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  const context = useContext(AuthContext);
  useEffect(() => {
    window.addEventListener('resize', checkSize);

    getData();

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [screenSize]);

  useEffect(() => {
    // appList();
    getData();
    // savedJobs();
    // offersList();
  }, []);

  async function getData() {
    const response = await superagent.get(`${API}/search/get-full-info/${id}`);
    setData([...response.body]);
    console.log(response.body);
    setUserName(`${response.body[0].first_name} ${response.body[0].last_name}`);
    setTitle(response.body[0].job_title);
    setLogo(response.body[0].avatar);
    setLocation(response.body[0].country);
    setSammary(response.body[0].sammary);
  }

  // const appList = async () => {
  //   superagent
  //     .get(`${API}/user/app`)
  //     .set({ Authorization: `Basic ${context.token}` })

  //     .then((data) => {
  //       data.body !== null ? setApplications([[...data.body.API.slice(0, 2), ...data.body.DB.slice(0, 3)], data.body.DB.length + data.body.API.length]) : setApplications([[...data.body.DB, ...data.body.API], data.body.API.length + data.body.DB.length]);
  //     });
  // };

  // const savedJobs = async () => {
  //   superagent
  //     .get(`${API}/user/saved`)
  //     .set({ Authorization: `Basic ${context.token}` })

  //     .then((data) => {
  //       data.body[0] !== null ? setJobs([[...data.body.data_Api.slice(0, 2), ...data.body.data_DB.slice(0, 3)], data.body.data_DB.length + data.body.data_Api.length]) : setJobs([data.body, 0]);
  //     });
  // };

  // const offersList = async () => {
  //   superagent
  //     .get(`${API}/user/offers`)
  //     .set({ Authorization: `Basic ${context.token}` })

  //     .then((data) => {
  //       data.body !== null ? setOffers([data.body.slice(0, 4), data.body.length]) : setOffers([data.body, data.body.length]);
  //     });
  // };

  return (
    <>
      <Container className='content' style={{ margin: '40px auto' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504edf', borderLeftWidth: '5px', paddingLeft: '8px', marginBottom: 30 }}>
            <h2 style={{ color: '#504edf', fontSize: '45px', fontWeight: 'bold' }}>
              <span style={{ color: '#515151', fontSize: '45px', fontWeight: 'bold' }}>Profile</span>
            </h2>
          </Col>
          <Col style={{ textAlign: 'right', alignSelf: 'center' }}>
            <Link to='/reports/new'>
              <Button variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginBottom: '50px', height: '40px', fontWeight: '500' }}>
                <Icon.CalendarPlus style={{ paddingBottom: '2px' }} size={20} /> New Meeting
              </Button>
            </Link>
          </Col>

          {/* <Col style={{ textAlign: 'right', alignSelf: 'center' }}>
            <Link to='/reports/new'>
              <Button variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginBottom: '50px', height: '40px', fontWeight: '500' }}>
                <Icon.ChatSquareDotsFill style={{ paddingBottom: '2px' }} size={20} />
              </Button>
            </Link>
          </Col>
          <Col style={{ textAlign: 'right', alignSelf: 'center' }}>
            <Link to='/reports/new'>
              <Button variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginBottom: '50px', height: '40px', fontWeight: '500' }}>
                <Icon.JournalPlus style={{ paddingBottom: '2px' }} size={20} />
                send offer
              </Button>
            </Link>
          </Col> */}
        </Row>
        <Row>
          <Col md='4'>
            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              &nbsp;
            </CardTitle>
            <Card className='card-user1'>
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
            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              &nbsp;
            </CardTitle>
            <Card className='two'>
              <CardHeader style={{ paddingTop: 25 }}>
                <Row className='flexRow list-header2' sm={12} style={{ justifyContent: screenSize > 1199 ? 'center' : 'center', alignItems: 'center', display: 'flex' }}>
                  <h5>Courses</h5>
                </Row>
              </CardHeader>
              <CardBody>
                {data.map((course) => {
                  return (
                    <Row className='list-body-exp' sm={12} style={{ justifyContent: screenSize > 1199 ? 'left' : 'center', paddingTop: 20, alignItems: 'flex-start !important' }}>
                      <Col style={{ textAlign: screenSize > 575 ? 'right' : 'center', color: '#515151', fontWeight: 650 }} sm={3} lg={3}>
                        <Image style={{ width: '50px', height: '50px', objectFit: 'cover', border: 'black solid 1px' }} src='https://images.squarespace-cdn.com/content/v1/55d1e076e4b0be96a30dc726/1456851579258-9236R741NF444UVEUHZ3/ke17ZwdGBToddI8pDm48kDmvgM2_GYudIur22MWWiLdZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIvFa2r33EMaMk7hlBJBei4G1FTiqzsF6lpp3EXtW1YCk/computerworld_training_courses' roundedCircle />
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151', fontWeight: 650, paddingTop: 5 }} sm={8} lg={8}>
                        <h6 style={{ fontWeight: 600, fontSize: 20 }} className='title'>
                          {course.course_name}
                        </h6>
                        <p className='description'>
                          {course.org}, {course.course_date.slice(0, 4)} <br /> <span style={{ fontWeight: 500, fontSize: 15 }}>{course.c_field}</span>
                        </p>
                      </Col>
                    </Row>
                  );
                })}
              </CardBody>
            </Card>
          </Col>
          <Col md='8'>
            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              &nbsp;
            </CardTitle>
            <Card className='sammary'>
              <CardHeader style={{ paddingTop: 25 }}>
                <Row className='flexRow list-header2' sm={12} style={{ justifyContent: screenSize > 1199 ? 'center' : 'center', alignItems: 'center', display: 'flex' }}>
                  <h5>Summary</h5>
                </Row>
              </CardHeader>
              <CardBody>
                <p style={{ fontSize: 15 }}>{sammary}</p>
              </CardBody>
            </Card>

            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              &nbsp;
            </CardTitle>
            <Card className='two'>
              <CardHeader style={{ paddingTop: 25 }}>
                <Row className='flexRow list-header2' sm={12} style={{ justifyContent: screenSize > 1199 ? 'center' : 'center', alignItems: 'center', display: 'flex' }}>
                  <h5>Work Experience</h5>
                </Row>
              </CardHeader>
              <CardBody>
                {data.map((exp) => {
                  return (
                    <Row className='list-body-exp' sm={12} style={{ justifyContent: screenSize > 1199 ? 'left' : 'center', paddingTop: 20, alignItems: 'flex-start !important' }}>
                      <Col style={{ textAlign: screenSize > 575 ? 'right' : 'center', color: '#515151', fontWeight: 650 }} sm={2} lg={2}>
                        <Image style={{ width: '70px', height: '70px', objectFit: 'cover', border: 'black solid 1px' }} src={exp.ex_logo} roundedCircle />
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151', fontWeight: 650, paddingTop: 5 }} sm={9} lg={9}>
                        <h6 style={{ fontWeight: 600, fontSize: 20 }} className='title'>
                          {exp.title}
                        </h6>
                        <p className='description'>
                          {exp.company}, {exp.location} <br /> <span style={{ fontWeight: 500, fontSize: 15 }}>{exp.ex_field || 'field'}</span> <br />{' '}
                          <span style={{ fontWeight: 600, fontSize: 15 }}>
                            {exp.ex_starting_date || '2020'}, {exp.ex_present ? 'Present' : exp.ex_ending_date || '2021'}
                          </span>
                        </p>
                        <p style={{ color: '#515151', fontSize: '14px', textAlign: 'justify', fontWeight: 500 }}>{exp.ex_description}</p>
                      </Col>
                    </Row>
                  );
                })}
              </CardBody>
            </Card>
            <CardTitle style={{ margin: '9px 0', textAlign: 'center' }} tag='h4'>
              &nbsp;
            </CardTitle>
            <Card className='two'>
              <CardHeader style={{ paddingTop: 25 }}>
                <Row className='flexRow list-header2' sm={12} style={{ justifyContent: screenSize > 1199 ? 'center' : 'center', alignItems: 'center', display: 'flex' }}>
                  <h5>Education</h5>
                </Row>
              </CardHeader>
              <CardBody>
                {data.map((edu) => {
                  return (
                    <Row className='list-body-exp' sm={12} style={{ justifyContent: screenSize > 1199 ? 'left' : 'center', paddingTop: 20, alignItems: 'flex-start !important' }}>
                      <Col style={{ textAlign: screenSize > 575 ? 'right' : 'center', color: '#515151', fontWeight: 650 }} sm={2} lg={2}>
                        <Image style={{ width: '70px', height: '70px', objectFit: 'cover', border: 'black solid 1px' }} src={edu.edu_logo} roundedCircle />
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151', fontWeight: 650, paddingTop: 5 }} sm={9} lg={9}>
                        <h6 style={{ fontWeight: 600, fontSize: 20 }} className='title'>
                          {edu.school}
                        </h6>
                        <p style={{ fontWeight: 500, fontSize: 13 }}>
                          {' '}
                          <span style={{ fontWeight: 600, fontSize: 15 }}>{edu.edu_field || 'field'}</span>
                          <br />
                          {edu.degree}, {edu.grade} <br />{' '}
                          <span style={{ fontWeight: 500, fontSize: 15 }}>
                            {edu.edu_starting_date || '2020'}, {edu.edu_present ? 'Present' : edu.edu_ending_date || '2021'}
                          </span>
                        </p>
                        <p style={{ color: '#515151', fontSize: '14px', textAlign: 'justify', fontWeight: 500 }}>{edu.edu_description}</p>
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