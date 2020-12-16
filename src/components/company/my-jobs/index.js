/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import '../styles.scss';
import superagent from 'superagent';
import Spinner from 'react-bootstrap/Spinner';
import { If } from 'react-if';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBContainer } from 'mdbreact';

const jobsApi = 'https://jobify-app-v2.herokuapp.com/company/jobs';
export default function MyJobs(props) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [results, setResults] = useState([]);
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  let history = useHistory();
  const scrollContainerStyle = { width: 'auto', maxHeight: '300px', height: 'fit-content', overflowY: 'scroll', overflowX: 'hidden', padding: 0 };
  const scrollContainerStyle2 = { width: 'auto', maxHeight: '500px', height: 'fit-content', overflowY: 'scroll', overflowX: 'hidden', padding: 0 };
  const context = useContext(AuthContext);

  const jobList = async (e) => {
    superagent
      .get(jobsApi)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        setResults(data.body);
        setLoader(false);
      });
  };

  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  const deleteJob = (id) => {
    setLoader(true);
    superagent
      .delete(`${jobsApi}/${id}`)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        console.log(data.text);
        jobList();
        setLoader(false);
        setShow(false);
      });
  };

  useEffect(() => {
    if (context.token) {
      jobList();
    }
  }, [context.token]);

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    if (context.token) {
      jobList();
    }
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [screenSize]);
  return (
    <>
      <Container style={{ justifyContent: 'center', width: '85%' }}>
        <Row sm={8}>
          <Col style={{ color: '#515151', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>My Jobs</Col>
        </Row>
        <Row>
          <Container style={{ justifyContent: 'center', width: '100%' }} className='list-container' fluid>
            <Row sm={8} className='flexRow list-header2' style={{ height: screenSize > 575 ? '80px' : 'fit-content' }}>
              <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > 575 ? 'left' : 'center' }} className='col-title2' sm={3}>
                Title
              </Col>
              <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2}>
                Type
              </Col>
              <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2}>
                Location
              </Col>
              <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={2}>
                Num Of App
              </Col>
              <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={1.5}>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </Col>
              <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={1}>
                <If condition={loader}>
                  <Spinner animation='border' variant='primary' />
                </If>
              </Col>
            </Row>
            <Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-50w' aria-labelledby='example-custom-modal-styling-title'>
              <Modal.Header closeButton>
                <Modal.Title id='example-custom-modal-styling-title'>Delete Job</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure that you want to DELETE this job?</p>
                <Button className='button' onClick={() => deleteJob(id)} variant='outline-light' style={{ backgroundColor: '#B72525' }}>
                  Delete
                </Button>
              </Modal.Body>
            </Modal>
            <MDBContainer className='scrollbar scrollbar-primary  mt-5 mx-auto' style={screenSize > 575 ? scrollContainerStyle : scrollContainerStyle2}>
              {results.map((item) => {
                return (
                  <>
                    <Row className='flexRow list-body' sm={12}>
                      <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={3}>
                        {item.title}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2}>
                        {item.type}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2}>
                        {item.location}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                        {item.applicants_num}
                      </Col>
                      <Row sm={2.5}>
                        <Col style={{ textAlign: 'center' }} sm={1.25}>
                          <Button className='button' onClick={() => history.push(`submitted-jobs/${item.id}`)} variant='outline-light' style={{ backgroundColor: '#504edf' }}>
                            Update
                          </Button>
                        </Col>
                        <Col style={{ textAlign: 'center' }} sm={1.25}>
                          <Button
                            className='button'
                            onClick={() => {
                              setShow(true);
                              setId(item.id);
                            }}
                            variant='outline-light'
                            style={{ backgroundColor: '#B72525' }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Row>
                  </>
                );
              })}
            </MDBContainer>
          </Container>
        </Row>

        <Row className='image-container' style={{ justifyContent: 'center' }}>
          <Image className='image' style={{ width: '70%' }} src='../../assets/search.png' rounded />
        </Row>
      </Container>
    </>
  );
}
