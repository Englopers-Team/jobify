import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { Container, Row, Col, Dropdown, FormControl, Image, FormCheck, FormLabel } from 'react-bootstrap';
import { If, Then, Else } from 'react-if'

export default function Block() {
  const [person, setPerson] = useState([]);
  const [company, setCompany] = useState([]);
  const [searchType, setSearchType] = useState('p');
  const [query, setQuery] = useState('');
  const [id, setId] = useState();
  const [searchTypeQuery, setSearchTypeQuery] = useState('Id');

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
            <Row key={index} onClick={() => { setId(item.auth_id) }}>
              <Col>{item.auth_id}</Col>
              <Col>
                <Image src={`${item.avatar}`} roundedCircle style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              </Col>
              <Col>{item.company_name}</Col>
            </Row>
          )
        }
      })
    } else if (searchType === 'p') {
      return person.map((item, index) => {
        let name = `${item.first_name} ${item.last_name}`
        if (name.toLowerCase().includes(query.toLowerCase()) && searchTypeQuery === 'Username' || query == item.auth_id && searchTypeQuery === 'Id' || query === '') {
          return (
            <Row key={index} onClick={() => { setId(item.auth_id) }}>
              <Col>{item.auth_id}</Col>
              <Col>
                <Image src={`${item.avatar}`} roundedCircle style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              </Col>
              <Col>
                <p>{name}</p>
                <p>{item.job_title}</p>
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
      data = (
        <Row>
          <Col>{target.auth_id}</Col>
          <Image src={`${target.avatar}`} roundedCircle style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          <Col>{target.company_name}</Col>
        </Row>
      )
    } else if (target.company_name) {
      let name = `${target.first_name} ${target.last_name}`
      data = (
        <Row>
          <Col>{target.auth_id}</Col>
          <Image src={`${target.avatar}`} roundedCircle style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          <Col>
            <p>{name}</p>
            <p>{target.job_title}</p>
          </Col>
        </Row>
      )
    }
    return data
  }
  return (
    <Container>
      <Row sm={10}>
        <Col sm={8}>
          <Row>
            <FormCheck type="switch" name="formHorizontalSwitch" id="custom" label="Search By Username" onChange={(e) => { setSearchTypeQuery(searchTypeQuery === 'Id' ? 'Username' : 'Id') }} />
            <FormControl placeholder={`Search By ${searchTypeQuery}`} onChange={(e) => { setQuery(e.target.value) }} />
            <FormCheck type="radio" name="formHorizontalRadios" id="custom-switch" label='Person' onChange={() => { setSearchType('p') }} />
            <FormCheck type="radio" name="formHorizontalRadios" id="custom-switch" label="Company" onChange={() => { setSearchType('c') }} />
          </Row>
          <Row>
            <Result />
          </Row>
        </Col>
        <Col sm={4}>
          <List />
        </Col>
      </Row>
    </Container>
  )
}



