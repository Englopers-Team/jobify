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
  const [appStatus, setAppStatus] = useState('Hi');
  const [results, setResults] = useState([]);
  const [loader, setLoader] = useState(true);
  // let history = useHistory();
  // const context = useContext(AuthContext);

  const jobList = async (e) => {
    superagent
      .get(jobsApi)
      .set({ Authorization: `Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudF90eXBlIjoiYyIsInByb2ZpbGUiOnsiaWQiOjEsIm5hbWUiOiJEZW1vIENvbXBhbnkiLCJsb2dvIjoiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL3N2Zy9zdGF0aWMvaWNvbnMvc3ZnLzk5My85OTM4OTEuc3ZnIiwiY291bnRyeSI6IlVTQSJ9LCJpYXQiOjE2MDc2OTc0NDAsImV4cCI6MzYxNjA3Njk3NDQwfQ.L0t96L4ru5l0zA1wh4f0PvV22QRg49jtWsDC130M7qM` })

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
    console.log('Heerr', id);
    superagent
      .put(`${jobsApi}/${id}`)
      .send({ status: status1 })
      .set({ Authorization: `Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudF90eXBlIjoiYyIsInByb2ZpbGUiOnsiaWQiOjEsIm5hbWUiOiJEZW1vIENvbXBhbnkiLCJsb2dvIjoiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL3N2Zy9zdGF0aWMvaWNvbnMvc3ZnLzk5My85OTM4OTEuc3ZnIiwiY291bnRyeSI6IlVTQSJ9LCJpYXQiOjE2MDc2OTc0NDAsImV4cCI6MzYxNjA3Njk3NDQwfQ.L0t96L4ru5l0zA1wh4f0PvV22QRg49jtWsDC130M7qM` })
      .then((data) => {
        superagent
          .get(`${jobsApi}`)
          .set({ Authorization: `Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudF90eXBlIjoiYyIsInByb2ZpbGUiOnsiaWQiOjEsIm5hbWUiOiJEZW1vIENvbXBhbnkiLCJsb2dvIjoiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL3N2Zy9zdGF0aWMvaWNvbnMvc3ZnLzk5My85OTM4OTEuc3ZnIiwiY291bnRyeSI6IlVTQSJ9LCJpYXQiOjE2MDc2OTc0NDAsImV4cCI6MzYxNjA3Njk3NDQwfQ.L0t96L4ru5l0zA1wh4f0PvV22QRg49jtWsDC130M7qM` })
          .then((data) => {
            setResults(data.body);
            setLoader(false);
          });
      });
  };

  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  useEffect(() => {
    jobList();
  }, []);

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
            <Row sm={10} className='flexRow list-header2' style={{ justifyContent: 'center' }}>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} className='col-title2' sm={2} lg={1}>
                Pic
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} lg={2}>
                Name
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} lg={2}>
                Title
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Experience
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1}>
                Country
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Status
              </Col>
              <Col sm={3.5}>
                {/* <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1.5}>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Col> */}
                <Row>
                  <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1.5}>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </Col>
                  <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1.5}>
                    <If condition={loader}>
                      <Spinner animation='border' variant='primary' />
                      <Else>&nbsp; &nbsp; &nbsp; &nbsp; </Else>
                    </If>
                  </Col>
                  <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1.5}>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
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
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={3}>
                    {item.first_name}&nbsp;{item.last_name}
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={1.5}>
                    {item.job_title}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={1}>
                    {item.experince}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={1}>
                    {item.country}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
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
                      <a href={item.cv} target='_blank'>
                        <Col style={{ textAlign: 'center', paddingRight: '10px' }} sm={1.5}>
                          <Button className='buttons' variant='outline-light'>
                            CV
                          </Button>
                        </Col>
                      </a>
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
