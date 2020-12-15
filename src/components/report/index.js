/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Dropdown, FormControl, Card, Form, Button, Modal, Image } from 'react-bootstrap';
import superagent from 'superagent';
import { MDBContainer } from 'mdbreact';
import { AuthContext } from '../../context/auth';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { If, Else, Then } from 'react-if';
import './styles.scss';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';

import '../search/styles.scss';
import './styles.scss';

export default function Reports() {
  let [data, setData] = useState([]);
  let [singleData, setSingleData] = useState([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const context = useContext(AuthContext);
  const history = useHistory();
  const scrollContainerStyle = { width: 'auto', maxHeight: '400px', height: 'fit-content', overflowY: 'scroll', overflowX: 'hidden', marginTop: '0 !important' };

  useEffect(() => {
    if (context.token) {
      getData();
    }
  }, [context.token]);

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/reports`).set('authorization', `Basic ${context.token}`);
    setData(response.body);
  }

  async function getSingleReport(id) {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/report/${id}`).set('authorization', `Basic ${context.token}`);
    setSingleData(response.body);
  }

  return (
    <>
      <Container>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
            <h2 style={{ marginBottom: 0 }}>Your Feedback is Valuable</h2>
          </Col>
          <Col style={{ textAlign: 'right', alignSelf: 'center' }}>
            <Link to='/reports/new'>
              <Button variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginBottom: '50px', height: '40px', fontWeight: '500' }}>
                <Icon.PlusCircle style={{ paddingBottom: '2px' }} size={20} /> New Report
              </Button>
            </Link>
          </Col>
        </Row>
        <Row style={{ marginTop: '40px' }}></Row>
      </Container>
      <If condition={context.token && data[0]}>
        <Then>
          <Container style={{ justifyContent: 'center', width: '85%' }}>
            <Row sm={8}>
              <Col style={{ color: '#515151', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>My Reports</Col>
            </Row>
            <Row>
              <Container style={{ justifyContent: 'center', width: '100%' }} className='list-container' fluid>
                <Row sm={8} className='flexRow list-header2' style={{ textAlign: 'center', padding: '0 !important' }}>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                    Report Number
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={6}>
                    Description
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                    State
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={2}></Col>
                </Row>
                <Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-50w' aria-labelledby='example-custom-modal-styling-title'>
                  <Modal.Header closeButton>
                    <Modal.Title id='example-custom-modal-styling-title'>Report Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p style={{ fontWeight: 700 }}>{singleData.description}</p>
                    <p>{singleData.response}</p>
                    <Button className='button' onClick={() => setShow(false)} variant='outline-light' style={{ backgroundColor: '#504EDF' }}>
                      Ok
                    </Button>
                  </Modal.Body>
                </Modal>

                <MDBContainer className='scrollbar scrollbar-white  mt-5 mx-auto' style={scrollContainerStyle}>
                  {data.map((item) => {
                    console.log(item);
                    return (
                      <Row className='flexRow list-body' style={{ padding: '0 !improtant' }} sm={8}>
                        <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#515151', verticalAlign: 'center' }} sm={2}>
                          {item.id}
                        </Col>
                        <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#515151' }} sm={6}>
                          <p style={{ wordWrap: 'break-word', margin: '0' }}>
                            {item.description.slice(0, 45)}
                            {item.description.length > 45 ? '...' : ''}
                          </p>
                        </Col>
                        <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: item.response === null ? '#69D95B' : '#B72525' }} sm={2}>
                          {item.response === null ? 'Open' : 'Closed'}
                        </Col>
                        <Col style={{ textAlign: 'center' }} sm={2}>
                          <Button
                            className='button'
                            onClick={() => {
                              setShow(true);
                              getSingleReport(item.id);
                            }}
                            variant='outline-light'
                            style={{ backgroundColor: '#504EDF', color: 'white !important', fontWeight: '500' }}
                          >
                            Details
                          </Button>
                        </Col>
                      </Row>
                    );
                  })}
                </MDBContainer>
              </Container>
            </Row>
          </Container>
        </Then>
        <Else>
          <Row sm={8}>
            <Col style={{ color: '#717171', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>You Didn't Submit Any Report</Col>
          </Row>
        </Else>
      </If>
    </>
  );
}

// style={{ backgroundColor: '#B72525', color: 'white !important', fontWeight: '500' }}
