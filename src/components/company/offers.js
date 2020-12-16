import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import './styles.scss';
import superagent from 'superagent';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then, Else } from 'react-if';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { MDBContainer } from 'mdbreact';
import offersImg from './offers.svg'
const jobsApi = 'https://jobify-app-v2.herokuapp.com/company/offers';

export default function CompanyApplications(props) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [results, setResults] = useState([]);
  const [loader, setLoader] = useState(true);
  const [offerId, setOfferId] = useState(0);
  const [show, setShow] = useState(false);
  const context = useContext(AuthContext);
  const scrollContainerStyle = { width: 'auto', maxHeight: '300px', height: 'fit-content', overflowY: 'scroll', overflowX: 'hidden', padding: 0 };
  const scrollContainerStyle2 = { width: 'auto', maxHeight: '500px', height: 'fit-content', overflowY: 'scroll', overflowX: 'hidden', padding: 0 };
  const offersList = async (e) => {
    superagent
      .get(jobsApi)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        setResults(data.body);
        console.log(data.body);
        setLoader(false);
      });
  };

  const deleteOffer = (id) => {
    setLoader(true);
    superagent
      .delete(`${jobsApi}/${id}`)
      .set({ Authorization: `Basic ${context.token}` })

      .then((data) => {
        console.log(data.text);
        offersList();
        setLoader(false);
        setShow(false);
      });
  };

  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  useEffect(() => {
    if (context.token) {
      offersList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token]);

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    if (context.token) {      
      offersList();
    }
    return () => {
      window.removeEventListener('resize', checkSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);
  return (
    <>
      <Container style={{ justifyContent: 'center', width: '85%' }}>
        <Row sm={8}>
          <Col style={{ color: '#515151', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>Sent Offers</Col>
        </Row>
        <If condition={context.token && results[0]}>
          <Then>
            <Row>
              <Container style={{ justifyContent: 'center', width: '100%' }} className='list-container' fluid>
                <Row className='flexRow list-header2' sm={10} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151', fontWeight: 660 }} sm={2} lg={1}>
                    <p>Image</p>
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151', fontWeight: 660 }} sm={3} lg={2}>
                    <p>Name</p>
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151', fontWeight: 660 }} sm={2} lg={2}>
                    <p>Title</p>
                  </Col>

                  <Col style={{ textAlign: 'center', color: '#515151', fontWeight: 660 }} sm={2} lg={2}>
                    <p>Country</p>
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151', fontWeight: 660 }} sm={2} lg={2}>
                    <p>Status</p>
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151', fontWeight: 660 }} sm={1} lg={1}>
                    <p>Type</p>
                  </Col>
                  <Col style={{ textAlign: 'center', paddingRight: '10px' }}>
                    <If condition={loader}>
                      <Spinner animation='border' variant='primary' style={{ display: 'relative' }} />
                      <Button className='buttons' variant='outline-light' style={{ display: 'hidden' }}>
                        cv
                      </Button>
                      <Else>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Else>
                    </If>
                  </Col>
                </Row>

                <Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-50w' aria-labelledby='example-custom-modal-styling-title'>
                  <Modal.Header closeButton>
                    <Modal.Title id='example-custom-modal-styling-title'>Delete Job</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Are you sure that you want to DELETE this job?</p>
                    <Button className='button' onClick={() => deleteOffer(offerId)} variant='outline-light' style={{ backgroundColor: '#B72525' }}>
                      Delete
                    </Button>
                  </Modal.Body>
                </Modal>
                <MDBContainer className='scrollbar scrollbar-primary  mt-5 mx-auto' style={screenSize > 575 ? scrollContainerStyle : scrollContainerStyle2}>
                  {results.map((item) => {
                    return (
                      <Row className='flexRow list-body' sm={10} style={{ justifyContent: screenSize > 1199 ? 'space-between' : 'center' }}>
                        <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2} lg={1}>
                          <Image src={item.avatar} roundedCircle style={{ width: 50, height: 50, objectFit: 'cover' }} />
                        </Col>
                        <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={3} lg={2}>
                          {item.first_name}&nbsp;{item.last_name}
                        </Col>
                        <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#515151' }} sm={2} lg={2}>
                          {item.title}
                        </Col>
                        <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                          {item.country}
                        </Col>
                        <Col style={{ textAlign: 'center', color: '#515151' }} sm={2} lg={2}>
                          {item.status}
                        </Col>
                        <Col style={{ textAlign: 'center', color: '#515151' }} sm={1} lg={1}>
                          {item.type}
                        </Col>

                        <Col style={{ textAlign: 'center' }}>
                          <Button
                            className='buttons'
                            id='btn'
                            onClick={() => {
                              setOfferId(item.id);
                              setShow(true);
                            }}
                            variant='outline-light'
                            style={{ backgroundColor: '#B72525', fontSize: 15 }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    );
                  })}
                </MDBContainer>
              </Container>
            </Row>
          </Then>
          <Else>
            <Row sm={8}>
              <Col style={{ color: '#717171', fontSize: 35, fontWeight: 400, textAlign: 'center', marginTop: 30 }}>You don't have any offer</Col>
            </Row>
          </Else>
        </If>

        <Row className='image-container' style={{ justifyContent: 'center',marginTop:0 }}>
          <Image className='image' style={{ width: '60%' }} src={offersImg} rounded />
        </Row>
      </Container>
    </>
  );
}
