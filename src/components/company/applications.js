import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './styles.scss';
import superagent from 'superagent';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then, Else } from 'react-if';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import { NavLink, Link } from 'react-router-dom';
const jobsApi = 'https://jobify-app-v2.herokuapp.com/company/app';
export default function CompanyApplications(props) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [results, setResults] = useState([]);
  const [loader, setLoader] = useState(true);
  // let history = useHistory();
  const context = useContext(AuthContext);

  const jobList = async (e) => {
    superagent
      .get(jobsApi)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        setResults(data.body);
        console.log(data.body);
        setLoader(false);
      });
  };

  const rejectApp = (id, payload) => {
    let status1 = '';
    payload === 'Rejected' ? (status1 = 'Rejected') : (status1 = 'Accepted');
    setLoader(true);
    superagent
      .put(`${jobsApi}/${id}`)
      .send({ status: status1 })
      .set({ Authorization: `Basic ${context.token}` })
      .then((data) => {
        jobList();
      });
  };

  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  useEffect(() => {
    if (context.token) {
      jobList();
    }
  }, [context.token]);

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    jobList();
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [screenSize]);
  return (
    <>
      <Container style={{ justifyContent: 'center', width: '85%' }}>
        <Row sm={8}>
          <Col style={{ color: '#717171', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>Received Applications</Col>
        </Row>
        <Row>
          <Container style={{ justifyContent: 'center', width: '100%' }} className='list-container' fluid>
            <Row className='flexRow list-header2' sm={10} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
              <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={2} lg={1}>
                <p>Image</p>
              </Col>
              <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={3} lg={2}>
                <p>Name</p>
              </Col>
              <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={2} lg={2}>
                <p>Title</p>
              </Col>
              {/* <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={1} lg={1}>
                <p style={{ fontSize: 10 }}>Experience</p>
              </Col> */}
              <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2} lg={1}>
                <p>Country</p>
              </Col>
              <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2} lg={2}>
                <p>Status</p>
              </Col>
              <Col sm={3.5}>
                <Row>
                  <Col style={{ textAlign: 'center', paddingRight: '15px' }} sm={1.5}>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Col>
                  <Col style={{ textAlign: 'center', paddingRight: '15px' }} sm={1.5}>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Col>
                  <Col style={{ textAlign: 'center', paddingRight: '10px' }} sm={1.5}>
                    <If condition={loader}>
                      <Spinner animation='border' variant='primary' style={{ display: 'relative' }} />
                      <Button className='buttons' variant='outline-light' style={{ display: 'hidden' }}>
                        cv
                      </Button>
                      <Else>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</Else>
                    </If>
                  </Col>
                </Row>
              </Col>
            </Row>

            {results.map((item) => {
              return (
                <Row className='flexRow list-body' sm={10} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
                  <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2} lg={1}>
                    <Image src={item.avatar} roundedCircle style={{ width: 50, height: 50, objectFit: 'cover' }} />
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={3} lg={2}>
                    {item.first_name}&nbsp;{item.last_name}
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={2} lg={2}>
                    {item.job_title}
                  </Col>
                  {/* <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={1} lg={1}>
                    {item.experince}
                  </Col> */}
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2} lg={1}>
                    {item.country}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2} lg={2}>
                    {item.status === 'Pending' ? 'Pending' : item.status}
                  </Col>
                  <Col sm={3.5}>
                    <Row>
                      <Col style={{ textAlign: 'center', paddingRight: '15px' }} sm={1.5}>
                        <Button className='buttons' id='btn' onClick={() => rejectApp(item.id, 'Accepted')} variant='outline-light' style={{ backgroundColor: '#28a745', fontSize: 15 }}>
                          Accept
                        </Button>
                      </Col>
                      <Col style={{ textAlign: 'center', paddingRight: '15px' }} sm={1.5}>
                        <Button className='buttons' id='btn' onClick={() => rejectApp(item.id, 'Rejected')} variant='outline-light' style={{ backgroundColor: '#E85D67', fontSize: 15 }}>
                          Reject
                        </Button>
                      </Col>
                      <Col style={{ textAlign: 'center', paddingRight: '10px' }} sm={1.5}>
                        <a href={item.cv} target='_blank'>
                          <Button className='buttons' variant='outline-light' style={{ backgroundColor: '#232B4E', fontSize: 15 }}>
                            CV
                          </Button>
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            })}
          </Container>
        </Row>

        <Row className='image-container' style={{ justifyContent: 'center' }}>
          <Image className='image' style={{ width: '70%' }} src='../../assets/search.png' rounded />
        </Row>
      </Container>
    </>
  );
}
