import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, FormControl } from 'react-bootstrap';
import superagent from 'superagent';
import { MDBContainer } from "mdbreact";
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

import '../../search/styles.scss'
import '../styles.scss'

export default function Reports() {
  let [data, setData] = useState([]);
  let [sort, setSort] = useState('All Reports');
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
      if (typeof (item.response) == type || type === false && (Number(sortId) === item.id || sortId === '')) {
        return (
          <Row className='flexRow list-body' sm={8}>
            <Col style={{ fontWeight: 650, textAlign: 'center' }} sm={2}>
              {item.id}
            </Col>
            <Col style={{ textAlign: 'center', color: '#9393A1', maxHeight: '20px' }} sm={6}>
              <p style={{ wordWrap: 'break-word' }}>
                {item.description.slice(0, 45)}{item.description.length > 45 ? '...' : ''}
              </p>
            </Col>
            <Col style={{ textAlign: 'center', color: item.response === null ? 'green' : '#B72525' }} sm={2}>
              {item.response === null ? 'Open' : 'Closed'}
            </Col>
            <Col style={{ textAlign: 'center' }} className='button-col' sm={2}>
              <Link style={{ textDecoration: 'none' }} className='button' variant='praimary' id='link' to={{ pathname: `/admin/reports/${item.id}` }}>Details</Link>
            </Col>
          </Row>
        );
      }
    })
  }


  return (
    <>
      <Container style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }}>
        <Row sm={8} style={{ justifyContent: 'center', alignItem: 'center', textAlign: 'center' }}  >
          <Col sm={1} style={{ marginTop: '5px' }}>
            <Icon.Search size='25' />
          </Col>
          <Col sm={8}>
            <FormControl placeholder='Search By Report Number' className='input' style={{}} onChange={(e) => { setSortId(e.target.value) }} />
          </Col>
          <Col sm={3}>
            <Dropdown>
              <Dropdown.Toggle style={{ maxWidth: '160px', width: '160px' }} variant="Info" id="dropdown-basic">
                {sort}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { setType(false); setSort('All Reports') }}>All Reports</Dropdown.Item>
                <Dropdown.Item onClick={() => { setType('object'); setSort('Open Reports') }}>Open Reports</Dropdown.Item>
                <Dropdown.Item onClick={() => { setType('string'); setSort('Close Reports') }}>Close Reports</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

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

        <MDBContainer className="scrollbar scrollbar-white  mt-5 mx-auto" style={scrollContainerStyle}>
          <Result />
        </MDBContainer>
      </Container>
    </>
  );
}
