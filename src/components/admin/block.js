import React, { useEffect, useState, useContext } from 'react';
import superagent from 'superagent';
import { Container, Row, Col, Dropdown, FormControl, Image, FormCheck, FormLabel, Button } from 'react-bootstrap';
import { If, Then, Else } from 'react-if'
import { MDBContainer } from "mdbreact";
import { DashCircle } from 'react-bootstrap-icons';
import AdminHeader from '../header/admin';


import './styles.scss';
import { AuthContext } from '../../context/auth'

export default function Block() {
  const [person, setPerson] = useState([]);
  const [company, setCompany] = useState([]);
  const [searchType, setSearchType] = useState('p');
  const [query, setQuery] = useState('');
  const [id, setId] = useState();
  const [searchTypeQuery, setSearchTypeQuery] = useState('Id');
  const scrollContainerStyle = { backgroundColor: 'white', width: "auto", maxHeight: "500px", height: '500px', overflowY: 'scroll', overflowX: 'hidden' };

  const context = useContext(AuthContext)

  const API = 'https://jobify-app-v2.herokuapp.com';

  useEffect(() => {
    if (context.token) {
      getData();
    }

  }, [context.token]);

  async function getData() {
    const response = await superagent.get(`${API}/admin/users`).set('authorization', `Basic ${context.token}`);
    setPerson(response.body.dataPerson);
    setCompany(response.body.dataCompany);
    // getinfo
  }


  async function blockUserHanler(idBlocked) {
    await superagent.patch(`${API}/admin/block/${idBlocked}`).set('authorization', `Basic ${context.token}`);
    getData()
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
              <Col sm={8} style={{ margin: '0', color: '#9393A1', fontWeight: 'bold' }}>{item.company_name}</Col>
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
                <p style={{ margin: '0', color: '#9393A1', fontWeight: 'bold' }}>{name}</p>
                <p style={{ margin: '0', color: '#9393A1' }}>{item.job_title}</p>
              </Col>
            </Row>
          )
        }
      })
    }
  }

  const Result = () => {
    let data = (<h1 className='resulTarget' style={{ maxHeight: '400px', height: '400px', width: '100%', flexDirection: 'column' }}></h1>)
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
            <Col style={{ textAlign: 'right' }} >
              <If condition={target.account_status === 'blocked'}>
                <DashCircle className='BolckSign' />
              </If>
            </Col>
          </Row>
          <Row style={{ height: '60%', textAlign: 'right', paddingTop: '60px', justifyContent: 'center' }}>
            <Col style={{ textAlign: 'center' }} sm={4}>
              <Image src={`${target.avatar}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            </Col>
            <Col style={{ textAlign: 'center' }} sm={6}>
              <p style={{ textAlign: 'left' }}> <span style={{ fontWeight: 'bold' }}>Name :  </span> {name}</p>
              <p style={{ textAlign: 'left' }}> <span style={{ fontWeight: 'bold' }}>Job Title : </span> {target.job_title}</p>
              <p style={{ textAlign: 'left' }}> <span style={{ fontWeight: 'bold' }}>Country : </span>{target.country}</p>
              <p style={{ textAlign: 'left' }}> <span style={{ fontWeight: 'bold' }}>Phone : </span>{target.phone}</p>
            </Col>
          </Row>
          <Row style={{ height: '20%', maxHeight: '20%' }}>
          </Row>
          <Col >
            <If condition={target.account_status === 'blocked'}>
              <Then>
                <Button className=' button1' onClick={() => { blockUserHanler(target.auth_id) }}>Unblock</Button>
              </Then>
              <Else>
                <Button className=' button1' onClick={() => { blockUserHanler(target.auth_id) }}>Block</Button>
              </Else>
            </If>
          </Col>
        </Row>
      )
    } else if (target.company_name) {
      data = (
        <Row className='resulTarget' sm={12} style={{ maxHeight: '400px', height: '400px', width: '100%', flexDirection: 'column' }}>
          <Row sm={12} astyle={{ height: '20%' }} >
            <Col style={{ fontWeight: 'bold', margin: '3px' }} >User ID : {target.auth_id}</Col>
            <Col style={{ textAlign: 'right' }} >
              <If condition={target.account_status === 'blocked'}>
                <DashCircle className='BolckSign' />
              </If>
            </Col>
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
            <If condition={target.account_status === 'blocked'}>
              <Then>
                <Button className=' button1' onClick={() => { blockUserHanler(target.auth_id) }}>Unblock</Button>
              </Then>
              <Else>
                <Button className=' button1' onClick={() => { blockUserHanler(target.auth_id) }}>Block</Button>
              </Else>
            </If>          </Col>
        </Row>
      )
    }
    return data
  }
  return (
    <Row style={{ width: '100%' }}>
      <Col sm={2}>
        <AdminHeader />

      </Col>
      <Col sm={10} style={{ marginTop: '10px' }}>
        <Container>
          <Row sm={10}>
            <Col sm={7}>
              <Row className='list-container' style={{ maxHight: '120px', height: '120px', backgroundColor: '#253544', color: '#b4bdcc', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Col>
                  <FormCheck type="switch" name="formHorizontalSwitch" id="custom" label="Search By Username" onChange={(e) => { setSearchTypeQuery(searchTypeQuery === 'Id' ? 'Username' : 'Id') }} />
                  <FormControl style={{ width: '70%' }} placeholder={`Search By ${searchTypeQuery}`} onChange={(e) => { setQuery(e.target.value) }} />
                  <FormCheck type="radio" name="formHorizontalRadios" id="custom-switch" label='Person' onChange={() => { setSearchType('p') }} />
                  <FormCheck type="radio" name="formHorizontalRadios" id="custom-switch" label="Company" onChange={() => { setSearchType('c') }} />
                </Col>
              </Row>
              <Row className='list-container' style={{ maxHeight: '400px', height: '400px', display: 'flex', flexDirection: 'Row' }}>
                <Result />
              </Row>
            </Col>
            <Col className='list-container' sm={5}>
              <MDBContainer className="scrollbar scrollbar-primary" style={scrollContainerStyle}>
                <List />
              </MDBContainer>

            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  )
}



