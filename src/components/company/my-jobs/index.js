import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import '../styles.scss';
import superagent from 'superagent';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then } from 'react-if';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
const jobsApi = 'https://jobify-app-v2.herokuapp.com/company/jobs';
export default function MyJobs(props) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  // const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  // const [visable, setVisable] = useState(false);
  const [loader, setLoader] = useState(true);
  // let history = useHistory();
  // const context = useContext(AuthContext);

  const jobList = async (e) => {
    // setLoader(true);
    // setVisable(true);

    superagent
      .get(jobsApi)
      .set({ Authorization: `Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudF90eXBlIjoiYyIsInByb2ZpbGUiOnsiaWQiOjEsIm5hbWUiOiJEZW1vIENvbXBhbnkiLCJsb2dvIjoiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL3N2Zy9zdGF0aWMvaWNvbnMvc3ZnLzk5My85OTM4OTEuc3ZnIiwiY291bnRyeSI6IlVTQSJ9LCJpYXQiOjE2MDc2OTc0NDAsImV4cCI6MzYxNjA3Njk3NDQwfQ.L0t96L4ru5l0zA1wh4f0PvV22QRg49jtWsDC130M7qM` })

      .then((data) => {
        console.log('fffffff', data.body);
        setResults(data.body);
        setLoader(false);
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
      <Container style={{ justifyContent: 'center' }}>
        <Row>
          <Container className='list-container' fluid>
            <Row sm={8} className='flexRow list-header2'>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} className='col-title2' sm={2}>
                Title
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Type
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1}>
                Location
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={3}>
                Description
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Num Of Applications
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1.5}>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1}>
                <If condition={loader}>
                  <Spinner animation='border' variant='primary' />
                </If>
              </Col>
            </Row>

            {results.map((item) => {
              return (
                <Row className='flexRow list-body' sm={8}>
                  <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2}>
                    {item.title}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.type}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={1}>
                    {item.location}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={3}>
                    {item.description}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.applicants_num}
                  </Col>
                  <Row sm={2.5}>
                    <Col style={{ textAlign: 'center' }} sm={1.25}>
                      <Button className='button' onClick={() => console.log('Hi2')} variant='outline-light' style={{ backgroundColor: '#363B59' }}>
                        Update
                      </Button>
                    </Col>
                    <Col style={{ textAlign: 'center' }} sm={1.25}>
                      <Button className='button' onClick={() => console.log('Hi2')} variant='outline-light' style={{ backgroundColor: '#E85D67' }}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
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
