import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { If } from 'react-if';
import { Container, Image, Row, Col, Card, Button } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { Editor } from '@tinymce/tinymce-react';
import { useHistory, useParams } from "react-router-dom";
import AdminHeader from '../../header/admin';


import { AuthContext } from '../../../context/auth'

import './styles.scss'

export default function ReportDetails() {
  let { id } = useParams();
  let history = useHistory();
  const context = useContext(AuthContext)

  const [data, setData] = useState({});
  const [body, setBody] = useState('');
  const API = 'https://jobify-app-v2.herokuapp.com';


  const scrollContainerStyle = { width: "auto", maxHeight: "200px", height: '200px', overflowY: 'scroll', overflowX: 'hidden' };

  const handleEditorChange = (content, editor) => {
    setBody(content)
  }


  async function handleSubmit() {
    await superagent.patch(`${API}/admin/report/${id}`).set('authorization', `Basic ${context.token}`).send({ response: body });
    getData();
  }

  async function handleDelete() {
    await superagent.delete(`${API}/admin/report/${id}`).set('authorization', `Basic ${context.token}`);
    history.push('/admin/reports')
  }

  useEffect(() => {
    if (context.token) {
      getData();
    }
  }, [context.token]);



  async function getData() {
    const response = await superagent.get(`${API}/admin/report/${id}`).set('authorization', `Basic ${context.token}`);
    setData(response.body);
    if (response.body.report.response === null) {
      setBody(' ')
    } else {
      setBody(response.body.report.response)
    }
  }



  function Report() {
    let state = 'Open';
    let color = 'green'
    if (data.report.response !== null) {
      state = 'Close';
      color = '#B72525'
    }
    return (
      <>
        <Row >
          <Col style={{ fontSize: '14px', marginTop: '6px', marginLeft: '13px', fontWeight: 'bold' }} >
            Report Number : {id}
          </Col>
          <Col style={{ color: color, textAlign: 'end', marginTop: '6px', fontSize: '16px', marginRight: '13px', fontWeight: 'bold' }}>
            {state}
          </Col>
        </Row>
        <Row >
          <Col >
            <MDBContainer className="scrollbar scrollbar-primary2  mt-5 mx-auto" style={scrollContainerStyle}>
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
        <Row style={{ marginTop: '60px', height: '30%', textAlign: 'center' }} >
          <Col >
            <Image src={`${data.sender.avatar}`} roundedCircle style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
          </Col>
        </Row>
        <Row style={{ height: '20%', textAlign: 'center', fontSize: '22px', fontWeight: 'bold', marginTop: '3px' }} >
          <Col >
            {name}
          </Col>
        </Row>

        <Row style={{ height: '8%', marginLeft: '12px', textAlign: 'left', fontSize: '18px' }} >
          <Col >
            <span style={{ fontWeight: 'bold' }}>Acccount Type : </span>{account}
          </Col>
        </Row>
        <Row style={{ height: '8%', marginLeft: '12px', textAlign: 'left', fontSize: '18px' }} >
          <Col >
            <span style={{ fontWeight: 'bold' }}>Country : </span>{data.sender.country}
          </Col>
        </Row>
        <Row style={{ height: '8%', marginLeft: '12px', textAlign: 'left', fontSize: '18px' }} >
          <Col >
            <span style={{ fontWeight: 'bold' }}>Phone : </span>{data.sender.phone}
          </Col>
        </Row>
        <Row style={{ height: '8%', marginLeft: '12px', textAlign: 'left', fontSize: '18px' }} >
          <Col >
            <span style={{ fontWeight: 'bold' }}>Email : </span>{data.report.email}
          </Col>
        </Row>


      </>
    )

  }

  return (
    <Row style={{ width: '100%' }}>
      <Col sm={2}>
        <AdminHeader />

      </Col>
      <Col sm={10}>
        <Container style={{ marginTop: '60px' }}>
          <If condition={data.report}>
            <Row sm={8}>
              <Col sm={3}>
                <Card style={{ minHeight: '500px', height: '500px', backgroundColor: '#E1E3E8' }}>
                  <Profile />
                </Card>
              </Col>
              <Col sm={9}>
                <Card style={{ minHeight: '300px', height: '300px', backgroundColor: '#E1E3E8' }}>
                  <Report />
                </Card>
                <If condition={body.length >= 0}>
                  <Editor style={{ minHeight: '200px', height: '200px', backgroundColor: '#E1E3E8' }}
                    apiKey="vbaon8jny71c8uc0ebn1nn45htchbunbi6b9wp9v3e072trm"
                    initialValue={body}
                    init={{
                      height: 200,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar:
                        // eslint-disable-next-line no-multi-str
                        'undo redo | \
                  bullist numlist outdent indent | help'
                    }}
                    onEditorChange={handleEditorChange}
                  />
                </If>
                <Row >
                  <Col className='flexRow' style={{ alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                    <Button className='button13' style={{ marginLeft: '5px', marginTop: '5px' }} onClick={() => {
                      handleSubmit()
                    }}>Send</Button>
                    <Button  className='button13'  style={{ marginLeft: '5px', marginTop: '5px', backgroundColor: '#B72525' }} onClick={() => {
                      handleDelete()
                    }}>Delete</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </If>
        </Container>
      </Col>
    </Row>
  )
}




