import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, FormControl } from 'react-bootstrap';
import superagent from 'superagent';
import { MDBContainer } from "mdbreact";
import { Link } from 'react-router-dom';

import '../../search/styles.scss'
import './styles.scss'


import Button from 'react-bootstrap/Button';
export default function Reports() {
  let [data, setData] = useState([]);
  let [sort, setSort] = useState('Sort');
  let [type, setType] = useState(false);
  let [sortId, setSortId] = useState('');
  const scrollContainerStyle = { width: "auto", maxHeight: "400px", height: '400px', overflowY: 'scroll', overflowX: 'hidden' };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWNjb3VudF90eXBlIjoiYWRtaW4iLCJwcm9maWxlIjp7fSwiaWF0IjoxNjA3NzA4MDY2LCJleHAiOjM2MTYwNzcwODA2Nn0.uErZAP_4ZCFUp-WLXIhXlV7SZu40itfj0C6m1Ppwm_c';
    const response = await superagent.get(`${API}/admin/report`).set('authorization', `Basic ${token}`);
    setData(response.body);
  }

  function Result() {

    return data.map((item) => {
      if (item.response === type || type === false && (Number(sortId) === item.id || sortId === '')) {
        return (
          <Row className='flexRow list-body' sm={8}>
            <Col style={{ fontWeight: 650, textAlign: 'center' }} sm={2}>
              {item.id}
            </Col>
            <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={6}>
              {item.description}
            </Col>
            <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
              {item.response === null ? 'Open' : 'Closed'}
            </Col>
            <Col style={{ textAlign: 'center' }} className='button-col' sm={2}>
              <Link style={{ textDecoration: 'none' }} className='button' variant='praimary' id='link' to={{ pathname: '/admin/reports/:id', query: { id: item.id } }}>Details</Link>
            </Col>
          </Row>
        );
      }
    })
  }


  return (
    <>
      <Row style={{ justfiyContent: 'center' , alignItem : 'center' }}>
        <FormControl onChange={(e) => { setSortId(e.target.value) }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" style={{ width: '10%' }} />
        <Dropdown>
          <Dropdown.Toggle variant="Info" id="dropdown-basic">
            {sort}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { setType(false); setSort('All Reports') }}>All Reports</Dropdown.Item>
            <Dropdown.Item onClick={() => { setType(null); setSort('Open Reports') }}>Open Reports</Dropdown.Item>
            <Dropdown.Item onClick={() => { setType(true); setSort('Close Reports') }}>Close Reports</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>

      <Container className='list-container' style={{ width: '80%' }}>
        <Row sm={8} className='flexRow list-header' style={{ textAlign: 'center' }}>
          <Col style={{ color: '#717171', fontWeight: 550 }} className='col-title' sm={2}>
            Report Number
        </Col>
          <Col style={{ color: '#717171', fontWeight: 550 }} sm={6}>
            Description
        </Col>
          <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
            State
        </Col>
          <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
          </Col>
        </Row>

        <MDBContainer className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
          <Result />
        </MDBContainer>
      </Container>
    </>
  );
}
