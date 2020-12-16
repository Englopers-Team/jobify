/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav, Modal, Spinner } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { If, Then, Else } from 'react-if';
import { AuthContext } from '../../context/auth';
import superagent from 'superagent';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';

export default function SavedJobs() {
  let history = useHistory();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const context = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const scrollContainerStyle = { width: 'auto', maxHeight: '300px', height: 'fit-content', overflowY: 'scroll', overflowX: 'hidden', padding: 0 };
  const scrollContainerStyle2 = { width: 'auto', maxHeight: '500px', height: 'fit-content', overflowY: 'scroll', overflowX: 'hidden', padding: 0 };
  const API = 'https://jobify-app-v2.herokuapp.com/user/saved';

  async function getData() {
    const response = await superagent.get(`${API}`).set('authorization', `Basic ${context.token}`);
    setData([...response.body.data_Api, ...response.body.data_DB]);
  }
  const Apply = (payload) => {
    const API = 'https://jobify-app-v2.herokuapp.com/user/apply';
    setLoader(true);
    superagent
      .post(`${API}/${payload.job_id}`)
      .set('authorization', `Basic ${context.token}`)
      .send(payload)
      .then((data) => {
        setLoader(false);
        setShow(false);
      });
  };

  const checkSize = () => {
    setScreenSize(window.screen.width);
  };
  useEffect(() => {
    window.addEventListener('resize', checkSize);
    if (context.token) {
      getData();
    }
    return () => {
      window.removeEventListener('resize', checkSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize, context.token]);

  return (
    <>
      <Container style={{ justifyContent: 'center', width: '85%' }}>
        <Container style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#717171', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>Saved Jobs</h2>
        </Container>
        <If condition={context.token && data[0]}>
          <Then>
            <Container className='list-container' style={{ marginTop: '20px' }} fluid>
              <Row sm={8} className='flexRow list-header' style={{ height: screenSize > 575 ? '80px' : '130px' }}>
                <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: screenSize > 575 ? 'center' : 'center' }} className='col-title' sm={1}></Col>
                <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: screenSize > 575 ? 'center' : 'center' }} className='col-title' sm={2}>
                  Job Title
                </Col>
                <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: screenSize > 575 ? 'center' : 'center' }} sm={3}>
                  Company Name
                </Col>
                <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                  Job Type
                </Col>
                <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                  Phone
                </Col>
                <Col sm={2}>
                  <If condition={loader}>
                    <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                      <Spinner animation='border' variant='primary' />
                    </Col>
                  </If>
                </Col>
              </Row>
              <MDBContainer className='scrollbar scrollbar-primary  mt-5 mx-auto' style={screenSize > 575 ? scrollContainerStyle : scrollContainerStyle2}>
                {data.map((item,index) => {
                  return (
                    <Row key={index} className='flexRow list-body' sm={8}>
                      <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={1}>
                        <Image style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={item.logo} roundedCircle />
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={2}>
                        {item.title}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={3}>
                        {item.company_name}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={2}>
                        {item.type}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} className='button-col' sm={2}>
                        {item.phone ? item.phone : 'No Number'}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center' }} className='button-col' sm={2}>
                        <Button
                          className='button'
                          style={{ backgroundColor: '#504edf', textAlign: 'center' }}
                          onClick={() => {
                            <If condition={item.job_id}>
                              <Then>
                                {Apply({
                                  job_id: item.job_id,
                                  company_id: item.company_id,
                                })}
                              </Then>
                              <Else>
                                {Apply({
                                  title: item.title,
                                  location: item.location,
                                  type: item.type,
                                  company_name: item.company_name,
                                  logo: item.logo,
                                  email: item.email,
                                  job_id: 0,
                                  api: true,
                                })}
                              </Else>
                            </If>;
                          }}
                          variant='praimary'
                        >
                          Apply
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
              </MDBContainer>
            </Container>
          </Then>
          <Else>
            <Row sm={8}>
              <Col style={{ color: '#717171', fontSize: 35, fontWeight: 400, textAlign: 'center', marginTop: 30 }}>You didn't Save Any Job</Col>
            </Row>
          </Else>
        </If>
      </Container>
    </>
  );
}
