import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import '../styles.scss';
import superagent from 'superagent';
import { NavLink, Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then } from 'react-if';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
const jobsApi = 'https://jobify-app-v2.herokuapp.com/company/jobs';
export default function MyJobs(props) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [results, setResults] = useState([]);
  const [loader, setLoader] = useState(true);
  let history = useHistory();
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);

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
          <Col style={{ color: '#717171', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>My Jobs</Col>
        </Row>
        <Row>
          <Container style={{ justifyContent: 'center', width: '100%' }} className='list-container' fluid>
            <Row sm={8} className='flexRow list-header2'>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} className='col-title2' sm={2}>
                Title
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2}>
                Type
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2}>
                Location
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Description
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1}>
                Num Of App
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1.5}>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1}>
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
                <Button className='button' onClick={() => deleteJob(id)} variant='outline-light' style={{ backgroundColor: '#E85D67' }}>
                  Delete
                </Button>
              </Modal.Body>
            </Modal>

            {results.map((item) => {
              return (
                <>
                  <Row className='flexRow list-body' sm={12}>
                    <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2}>
                      {item.title}
                    </Col>
                    <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={2}>
                      {item.type}
                    </Col>
                    <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={2}>
                      {item.location}
                    </Col>
                    <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                      {item.description}
                    </Col>
                    <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={1}>
                      {item.applicants_num}
                    </Col>
                    <Row sm={2.5}>
                      <Col style={{ textAlign: 'center' }} sm={1.25}>
                        <Button className='button' onClick={() => history.push(`submitted-jobs/${item.id}`)} variant='outline-light' style={{ backgroundColor: '#363B59' }}>
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
                          style={{ backgroundColor: '#E85D67' }}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Row>
                </>
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
