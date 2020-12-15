/* eslint-disable no-unused-vars */
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then } from 'react-if';
import Image from 'react-bootstrap/Image';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles.scss';
import Button from 'react-bootstrap/Button';
export default function CompanyResults(props) {
  let results = props.results;
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [loader, setLoader] = useState(false);
  let history = useHistory();

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
            <Row className='flexRow list-header2' style={{padding:'22px 0'}}>
              <Col style={{ color: '#515151', fontWeight: 550, textAlign: screenSize > 575 ? 'center' : 'center' }} className='col-title2' sm={1}>
              </Col>
              <Col style={{ color: '#515151', fontWeight: 550, textAlign: screenSize > 575 ? 'center' : 'center' }} className='col-title2' sm={2}>
                <p style={{ padding: 0, margin: 0, textAlign: 'center' }}>Name</p>
              </Col>
              <Col style={{ color: '#515151', fontWeight: 550, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                <p style={{ padding: 0, margin: 0, textAlign: 'center' }}>Job Title</p>

              </Col>
              <Col style={{ color: '#515151', fontWeight: 550, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                <p style={{ padding: 0, margin: 0, textAlign: 'center' }}>Location</p>

              </Col>
              <Col style={{ color: '#515151', fontWeight: 550, textAlign: 'center' }} sm={2}>
                <p style={{ padding: 0, margin: 0, textAlign: 'center' }}>Phone</p>
              </Col>
              <Col style={{ color: '#515151', fontWeight: 550, textAlign: 'center' }} sm={3}>
                <If condition={loader}>
                  <Spinner animation='border' variant='primary' />
                </If>
              </Col>
            </Row>

            {results.map((item) => {
              return (
                <Row className='flexRow list-body'>
                  <Col style={{ fontWeight: 650,paddingBottom:'10px',paddingTop:'10px', textAlign: screenSize > 575 ? 'center' : 'center' }} sm={1}>
                    <Image src={item.avatar} roundedCircle style={{ width: 50, height: 50, objectFit: 'cover' }} />
                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#515151' }} sm={2}>
                    <p style={{ padding: 0, margin: 0, textAlign: 'center' }}>{item.first_name} {item.last_name}</p>

                  </Col>
                  <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#515151' }} sm={2}>
                    {item.job_title}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                    {item.country}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                    {item.phone}
                  </Col>
                  {/* <Col style={{ textAlign: 'center' }} sm={2}> */}
                  {/* </Col> */}
                  <Col className='flexRow' style={{ textAlign: 'center' }} sm={3}>
                    <Button style={{width:'40%'}} className='button' onClick={() =>{
                      
                    } }>
                      Message
                        </Button>
                    <Button style={{width:'40%'}} 
                      className='button'
                      onClick={() => {
                      }}
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

