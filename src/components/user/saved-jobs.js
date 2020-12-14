/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav, Modal, Spinner } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { If, Then, Else } from 'react-if';
import { AuthContext } from '../../context/auth';
import superagent from 'superagent';
import './styles.scss';
import { useHistory } from 'react-router-dom';

export default function SavedJobs() {
  let history = useHistory();
  const context = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
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
  useEffect(() => {
    if (context.token) {
      getData();
    }
  }, [context.token]);

  return (
    <>
      <Container style={{ marginTop: '150px' }}>
        <Container style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '35px', fontWeight: 'bold', color: '#504edf' }}>Saved Jobs</h2>
        </Container>
        <Container className='list-container' style={{ marginTop: '20px' }} fluid>
          <Row sm={8} className='flexRow list-header'>
            <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: 'left' }} className='col-title' sm={2}></Col>
            <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: 'center' }} className='col-title' sm={2}>
              Job Title
            </Col>
            <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: 'center' }} sm={3}>
              Company Name
            </Col>
            <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: 'center' }} sm={2}>
              Job Type
            </Col>
            <Col style={{ color: '#717171', fontWeight: 'bold', textAlign: 'center' }} sm={2}>
              Phone
            </Col>
            <Col sm={1}>
              <If condition={loader}>
                <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                  <Spinner animation='border' variant='primary' />
                </Col>
              </If>
            </Col>
          </Row>

          {data.map((item) => {
            return (
              <Row className='flexRow list-body' sm={8}>
                <Col style={{ fontWeight: 650 }} sm={2}>
                  <Image style={{ width: '50px' }} src={item.logo} roundedCircle />
                </Col>
                <Col style={{ textAlign: 'left', color: '#9393A1' }} sm={2}>
                  {item.title}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={3}>
                  {item.company_name}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                  {item.type}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} className='button-col' sm={2}>
                  {item.phone}
                </Col>
                <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                  <Button
                    className='button'
                    style={{ paddingRight: '50px', backgroundColor: '#504edf' }}
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
        </Container>
      </Container>
    </>
  );
}
