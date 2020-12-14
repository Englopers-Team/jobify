import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { Container, Row, Col, Dropdown, FormControl, Image, FormCheck, FormLabel, Button } from 'react-bootstrap';
import { If, Then, Else } from 'react-if'
import { MDBContainer } from "mdbreact";

import './styles.scss';

export default function Block() {
  const [person, setPerson] = useState([]);
  const [company, setCompany] = useState([]);
  const [searchType, setSearchType] = useState('p');
  const [query, setQuery] = useState('');
  const [id, setId] = useState();
  const [searchTypeQuery, setSearchTypeQuery] = useState('Id');
  const scrollContainerStyle = { backgroundColor: 'white', width: "auto", maxHeight: "500px", height: '500px', overflowY: 'scroll', overflowX: 'hidden' };


  const API = 'https://jobify-app-v2.herokuapp.com';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWNjb3VudF90eXBlIjoiYWRtaW4iLCJwcm9maWxlIjp7fSwiaWF0IjoxNjA3NzA4MDY2LCJleHAiOjM2MTYwNzcwODA2Nn0.uErZAP_4ZCFUp-WLXIhXlV7SZu40itfj0C6m1Ppwm_c';

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await superagent.get(`${API}/admin/users`).set('authorization', `Basic ${token}`);
    setPerson(response.body.dataPerson);
    setCompany(response.body.dataCompany);
    // getinfo
  }

  async function getInfo() {
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${token}`);

  }


  const List = () => {
    console.log(searchTypeQuery)
    if (searchType === 'c') {
      return company.map((item, index) => {
        if (item.company_name.toLowerCase().includes(query.toLowerCase()) && searchTypeQuery === 'Username' || query == item.auth_id && searchTypeQuery === 'Id' || query === '') {
          return (
            <Row className='profile' key={index} onClick={() => { setId(item.auth_id) }}>
              <Col sm={2} style={{ textAlign: 'center', lineHeight: '300%', fontWeight: 'bold', color: '#9393A1' }}>{item.auth_id}</Col>
              <Col sm={2}>
                <Image src={`${item.logo}`} roundedCircle style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
              </Col>
              <Col sm={8} style={{ margin: '0', color: '#9393A1' }}>{item.company_name}</Col>
            </Row>
          )
        }
      })
    } else if (searchType === 'p') {
      return person.map((item, index) => {
        let name = `${item.first_name} ${item.last_name}`
        if (name.toLowerCase().includes(query.toLowerCase()) && searchTypeQuery === 'Username' || query == item.auth_id && searchTypeQuery === 'Id' || query === '') {
          return (
            <Row className='profile' key={index} onClick={() => { setId(item.auth_id) }}>
              <Col sm={2} style={{ textAlign: 'center', lineHeight: '300%', fontWeight: 'bold', color: '#9393A1' }} sm={2}>{item.auth_id}</Col>
              <Col sm={2}>
                <Image src={`${item.avatar}`} roundedCircle style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
              </Col>
              <Col sm={8}>
                <p style={{ margin: '0', color: '#9393A1' }}>{name}</p>
                <p style={{ margin: '0', color: '#9393A1' }}>{item.job_title}</p>
              </Col>
            </Row>
          )
        }
      })
    }
  }

  const Result = () => {
    let data = (<h1>Hello</h1>)
    let target = {};
    let tempList = [...person, ...company]
    tempList.forEach(item => {
      if (item.auth_id === id) {
        target = item;
      }
    })

    if (target.first_name) {
      let name = `${target.first_name} ${target.last_name}`
      data = (
        <Row className='resulTarget' sm={12} style={{ maxHeight: '400px', height: '400px', width: '100%', flexDirection: 'column' }}>
          <Row sm={12} astyle={{ height: '20%' }} >
            <Col style={{ fontWeight: 'bold', margin: '3px' }} >User ID : {target.auth_id}</Col>
            <Col style={{ textAlign: 'right' }} >{target.auth_id}</Col>
          </Row>
          <Row style={{ height: '60%', textAlign: 'right', paddingTop: '60px', justifyContent: 'center' }}>

            <Col style={{ textAlign: 'center', alignItem: 'center' }} sm={4}>
              <Image src={`${target.avatar}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            </Col>
            <Col style={{ textAlign: 'center', alignItem: 'center' }} sm={6}>
              <p style={{ textAlign: 'left' }}>  <span style={{ fontWeight: 'bold' }}>Name :  </span> {name}</p>
              <p style={{ textAlign: 'left' }}>  <span style={{ fontWeight: 'bold' }}>Job Title : </span> {target.job_title}</p>
              <p style={{ textAlign: 'left' }}>   <span style={{ fontWeight: 'bold' }}>Country : </span>{target.country}</p>
              <p style={{ textAlign: 'left' }}>   <span style={{ fontWeight: 'bold' }}>Phone : </span>{target.phone}</p>
              <p style={{ textAlign: 'left' }}>  <span style={{ fontWeight: 'bold' }}>Age : </span> {target.age}</p>
              <p style={{ textAlign: 'left' }}>  <span style={{ fontWeight: 'bold' }}>Experince :  </span>{target.experince}</p>
              <p style={{ textAlign: 'left' }}>  <span style={{ fontWeight: 'bold' }}>CV : </span> {target.cv}</p>
            </Col>
          </Row>
          <Col >
            <Button className='buttonBlock'>Block</Button>
          </Col>
        </Row>
      )
    } else if (target.company_name) {
      data = (
        <Row className='resulTarget' sm={12} style={{ maxHeight: '400px', height: '400px', width: '100%', flexDirection: 'column' }}>
          <Row sm={12} astyle={{ height: '20%' }} >
            <Col style={{ fontWeight: 'bold', margin: '3px' }} >User ID : {target.auth_id}</Col>
            <Col style={{ textAlign: 'right' }} >{target.auth_id}</Col>
          </Row>
          <Row style={{ height: '60%', textAlign: 'right', paddingTop: '60px', justifyContent: 'center' }}>
            <Col style={{ textAlign: 'center' }} sm={4}>
              <Image src={`${target.logo}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            </Col>
            <Col style={{ textAlign: 'center' }} sm={6}>
              <p style={{ textAlign: 'left' }}> <span style={{ fontWeight: 'bold' }}>Company Name : </span> {target.company_name}</p>
              <p style={{ textAlign: 'left' }}> <span style={{ fontWeight: 'bold' }}>Country : </span> {target.country}</p>
              <p style={{ textAlign: 'left' }}> <span style={{ fontWeight: 'bold' }}>Phone : </span>{target.phone}</p>
              <p style={{ textAlign: 'left' }}> <span style={{ fontWeight: 'bold' }}>Website: </span> {target.company_url}</p>
            </Col>
          </Row>
          <Row style={{ height: '20%', maxHeight: '20%' }}>
          </Row>
          <Col >
            <Button className='buttonBlock'>Block</Button>
          </Col>
        </Row>
      )
    }
    return data
  }
  return (
    <Container>
      <Row sm={10}>
        <Col sm={7}>
          <Row style={{ maxHight: '100px', height: '100px' }}>
            <FormCheck type="switch" name="formHorizontalSwitch" id="custom" label="Search By Username" onChange={(e) => { setSearchTypeQuery(searchTypeQuery === 'Id' ? 'Username' : 'Id') }} />
            <FormControl placeholder={`Search By ${searchTypeQuery}`} onChange={(e) => { setQuery(e.target.value) }} />
            <FormCheck type="radio" name="formHorizontalRadios" id="custom-switch" label='Person' onChange={() => { setSearchType('p') }} />
            <FormCheck type="radio" name="formHorizontalRadios" id="custom-switch" label="Company" onChange={() => { setSearchType('c') }} />
          </Row>
          <Row style={{ maxHeight: '400px', height: '400px', display: 'flex', flexDirection: 'Row' }}>
            <Result />
          </Row>
        </Col>
        <Col sm={5}>
          <MDBContainer className="scrollbar scrollbar-primary" style={scrollContainerStyle}>
            <List />
          </MDBContainer>

        </Col>
      </Row>
    </Container>
  )
}



