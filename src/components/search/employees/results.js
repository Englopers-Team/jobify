/* eslint-disable no-unused-vars */
import { Container, Row, Col, Modal, Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then } from 'react-if';
import Image from 'react-bootstrap/Image';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles.scss';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../../context/auth';
import { SocketContext } from '../../../context/socket';
import superagent from 'superagent'

export default function CompanyResults(props) {
  let results = props.results;
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [loader, setLoader] = useState(false);
  let history = useHistory();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-Time');
  const [description, setDescription] = useState('');
  const [personID, setPersonID] = useState(1);
  const context = useContext(AuthContext);
  const chat = useContext(SocketContext);

  const API = 'https://jobify-app-v2.herokuapp.com';

  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    superagent.post(`${API}/company/offers/${personID}`).set({ Authorization: `Basic ${context.token}` }).send({ title, location, type, description }).then((data) => {
      history.push('/company/offers')
    })
  }

  useEffect(() => {
    window.addEventListener('resize', checkSize);

    return () => {
      window.removeEventListener('resize', checkSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);
  return (
    <>
      <If condition={props.visable === 'noData'}>
        <Row style={{ backgroundColor: 'transparent', marginTop: 50 }} sm={8}>
          <Col style={{ color: '#515151', fontSize: 30, fontWeight: 500, textAlign: 'center' }}>No Results</Col>
        </Row>
      </If>
      <Container className='list-container' fluid>
        <If condition={props.visable === 'true'}>
          <Then>
            <Row sm={8} className='flexRow list-header2'>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} className='col-title2' sm={2}>
                Photo
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} className='col-title2' sm={2}>
                Name
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                Job Title
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={1}>
                Location
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={2}>
                Phone
              </Col>

              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={1}>
                <If condition={loader}>
                  <Spinner animation='border' variant='primary' />
                </If>
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={2}></Col>
              <Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-50w' aria-labelledby='example-custom-modal-styling-title'>
                <Modal.Header closeButton>
                  <Modal.Title id='example-custom-modal-styling-title'>Send Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form className='flexCol'>
                    <Form.Group style={{ marginBottom: '15px', width: '60%' }} controlId="exampleForm.jobtitle">
                      <Form.Control required onChange={(e) => setTitle(e.target.value)} className='input' type='text' placeholder='Job Title' />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '15px', width: '60%' }} controlId="exampleForm.location">
                      <Form.Control required onChange={(e) => setLocation(e.target.value)} className='input' type='text' placeholder='Location' />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '15px', width: '60%' }} controlId="exampleForm.type">
                      <Form.Control onChange={(e) => {
                        setType(e.target.value)
                      }} as="select" defaultValue="Full Time">
                        <option value='Full-Time'>Full Time</option>
                        <option value='Part-Time'>Part Time</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '15px', width: '60%' }} controlId="exampleForm.desc">
                      <Form.Control as="textarea" rows={3} required onChange={(e) => setDescription(e.target.value)} className='input' type='text' placeholder='Description' />
                    </Form.Group>

                    <Button onClick={(e) => handleSubmit(e)} variant='outline-dark' size='lg' className='button' block type='submit' style={{ marginBottom: '50px', height: '40px', fontSize: '24px', fontWeight: '500', paddingBottom: '40px', width: '30%' }}>
                      Send
              </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </Row>

            {results.map((item, index) => {
              return (
                <Row key={index} sm={8} className='flexRow list-body'>
                  <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                    <Image src={item.avatar} roundedCircle style={{ width: 50, height: 50, objectFit: 'cover' }} />
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={2}>
                    {item.first_name} {item.last_name}
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={2}>
                    {item.job_title}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={1}>
                    {item.country}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.phone}
                  </Col>
                  <Col style={{ textAlign: 'center' }} sm={1}>
                    <Button className='button' onClick={() => {
                      chat.socketMessg.emit('message', { body: 'Hello, I have an offer for you.', receiver: item.id, token: context.token, type: 'p' })
                      chat.socketMessg.emit('checkMsg', { token: context.token })
                      const sideBtn = document.getElementById('chatButton')
                      const chatBox = document.getElementById('chat')
                      sideBtn.classList.remove('slideinBtn')
                      sideBtn.classList.add('slideoutBtn')
                      setTimeout(() => {
                        sideBtn.classList.add('hide')
                        sideBtn.classList.remove('slideoutBtn')
                        chatBox.classList.remove('hideChat')
                        chatBox.classList.add('slideinChat')
                        chat.setUpdate(item.id)
                      }, 500)

                    }} style={{ backgroundColor: '#504edf', width: '100px' }}>
                      Contact
                      </Button>
                  </Col>
                  <Col style={{ textAlign: 'center' }} sm={2}>
                    <Button
                      className='button'
                      onClick={() => {
                        setShow(true);
                        setPersonID(item.id)
                      }}
                      style={{ backgroundColor: '#504edf', width: '100px' }}
                    >
                      Send Offer
                      </Button>
                  </Col>
                </Row>
              );
            })}
          </Then>
        </If>
      </Container>
    </>
  );
}

