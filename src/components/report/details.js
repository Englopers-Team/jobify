import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import { If } from 'react-if';
import { Container, Image, Row, Col, Card, Button } from 'react-bootstrap';
import { MDBContainer } from 'mdbreact';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory, useParams } from 'react-router-dom';

import './styles.scss';

export default function ReportDetails() {
  let { id } = useParams();
  let history = useHistory();

  const [data, setData] = useState({});
  const [body, setBody] = useState('');
  const API = 'https://jobify-app-v2.herokuapp.com';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWNjb3VudF90eXBlIjoiYWRtaW4iLCJwcm9maWxlIjp7fSwiaWF0IjoxNjA3NzA4MDY2LCJleHAiOjM2MTYwNzcwODA2Nn0.uErZAP_4ZCFUp-WLXIhXlV7SZu40itfj0C6m1Ppwm_c';

  const scrollContainerStyle = { width: 'auto', maxHeight: '200px', height: '200px', overflowY: 'scroll', overflowX: 'hidden' };

  const handleEditorChange = (content, editor) => {
    setBody(content);
  };

  async function handleSubmit() {
    await superagent.patch(`${API}/admin/report/${id}`).set('authorization', `Basic ${token}`).send({ response: body });
    getData();
  }

  async function handleDelete() {
    await superagent.delete(`${API}/admin/report/${id}`).set('authorization', `Basic ${token}`);
    history.push('/admin/reports');
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await superagent.get(`${API}/admin/report/${id}`).set('authorization', `Basic ${token}`);
    console.log(response.body.report.description);
    setData(response.body);
    if (response.body.report.response === null) {
      setBody(' ');
    } else {
      setBody(response.body.report.response);
    }
  }

  function Report() {
    let state = 'Open';
    let color = 'green';
    if (data.report.response !== null) {
      state = 'Close';
      color = 'red';
    }
    return (
      <>
        <Row>
          <Col style={{ fontSize: '14px', marginTop: '6px', marginLeft: '13px', fontWeight: 'bold' }}>Report Number : {id}</Col>
          <Col style={{ color: color, textAlign: 'end', marginTop: '6px', fontSize: '16px', marginRight: '13px', fontWeight: 'bold' }}>{state}</Col>
        </Row>
        <Row>
          <Col>
            <MDBContainer className='scrollbar scrollbar-primary  mt-5 mx-auto' style={scrollContainerStyle}>
              {data.report.description}Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.
            </MDBContainer>
          </Col>
        </Row>
      </>
    );
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
        <Row style={{ marginTop: '60px', height: '30%', textAlign: 'center' }}>
          <Col>
            <Image src={`${data.sender.avatar}`} roundedCircle style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
          </Col>
        </Row>
        <Row style={{ height: '20%', textAlign: 'center', fontSize: '22px', fontWeight: 'bold', marginTop: '3px' }}>
          <Col>{name}</Col>
        </Row>

        <Row style={{ height: '8%', marginLeft: '12px', textAlign: 'left', fontSize: '18px' }}>
          <Col>Acccount Type : {account}</Col>
        </Row>
        <Row style={{ height: '8%', marginLeft: '12px', textAlign: 'left', fontSize: '18px' }}>
          <Col>Country : {data.sender.country}</Col>
        </Row>
        <Row style={{ height: '8%', marginLeft: '12px', textAlign: 'left', fontSize: '18px' }}>
          <Col>Phone : {data.sender.phone}</Col>
        </Row>
        <Row style={{ height: '8%', marginLeft: '12px', textAlign: 'left', fontSize: '18px' }}>
          <Col>Email : {data.report.email}</Col>
        </Row>
      </>
    );
  }

  return (
    <Container>
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
              <Editor
                style={{ minHeight: '200px', height: '200px', backgroundColor: '#E1E3E8' }}
                apiKey='vbaon8jny71c8uc0ebn1nn45htchbunbi6b9wp9v3e072trm'
                initialValue={body}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
                  toolbar:
                    // eslint-disable-next-line no-multi-str
                    'undo redo | \
                  bullist numlist outdent indent | help',
                }}
                onEditorChange={handleEditorChange}
              />
            </If>
            <Row>
              <Col className='flexRow' style={{ alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                <Button
                  style={{ marginLeft: '5px', marginTop: '5px' }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Send
                </Button>
                <Button
                  style={{ marginLeft: '5px', marginTop: '5px', backgroundColor: 'red' }}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </If>
    </Container>
  );
}
