import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import { If, Then } from 'react-if';
import { Container, Image, Row, Col, Card } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";


import { useParams } from "react-router-dom";

export default function ReportDetails() {
  let { id } = useParams();
  const [data, setData] = useState({});
  console.log(id)


  useEffect(() => {
    getData();
  }, []);


  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWNjb3VudF90eXBlIjoiYWRtaW4iLCJwcm9maWxlIjp7fSwiaWF0IjoxNjA3NzA4MDY2LCJleHAiOjM2MTYwNzcwODA2Nn0.uErZAP_4ZCFUp-WLXIhXlV7SZu40itfj0C6m1Ppwm_c';
    const response = await superagent.get(`${API}/admin/report/${id}`).set('authorization', `Basic ${token}`);
    console.log(response.body.report.description)
    setData(response.body);
    console.log(data)
  }

  function Report() {
    let state = 'Open';
    let color = 'green'
    if (data.report.response !== null) {
      state = 'Close';
      color = 'red'
    }
    return (
      <>
        <Row>
          <Col >
            Report Number : {data.report.id}
          </Col>
          <Col style={{ color: color }}>
            {state}
          </Col>
        </Row>
        <Row>
          <Col>
            <MDBContainer>
              {data.report.description}
            </MDBContainer>
          </Col>
        </Row>
      </>
    )
  }

  function Profile() {
    let name;
    let account = 'Applicant';

    if (data.report.account_type === 'c') {
      name = `${data.sender.company_name}`;
    } else if (data.report.account_type === 'p') {
      name = `${data.sender.first_name} ${data.sender.last_name}`;
    }
    if (data.report.account_type === 'c') {
      account = 'Company';
    }
    return (
      <>
        <Col >
          <Image src={`${data.sender.avatar}`} roundedCircle style={{ width: '50px', height: '50px' }} />
          {name}
        </Col>
        <p>{data.report.email}</p>
        <p>{account}</p>
        <p>{data.sender.phone}</p>
        <p>{data.sender.country}</p>
      </>
    )

  }

  return (
    <Container>
      <If condition={data.report}>
        <Row sm={8}>
          <Col sm={4}>
            <Card style={{ minHeight: '500px', height: '500px', backgroundColor: '#E1E3E8' }}>
              <Profile />
            </Card>
          </Col>
          <Col sm={8}>
            <Card style={{ minHeight: '300px', height: '300px', backgroundColor: '#E1E3E8' }}>
              <Report />
            </Card>
          </Col>
        </Row>

      </If>
    </Container>
  )
}