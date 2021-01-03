/* eslint-disable no-unused-vars */
import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav, Modal, Spinner, DropdownButton, Dropdown } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { If, Else, Then } from 'react-if';
import { AuthContext } from '../../context/auth';
import { MDBContainer } from 'mdbreact';
import superagent from 'superagent';
import './styles.scss';

import { useHistory } from 'react-router-dom';

export default function UserOffers() {
  const context = useContext(AuthContext);
  let history = useHistory();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [appStatus, setAppStatus] = useState('');
  const scrollContainerStyle = { width: 'auto', maxHeight: '300px', height: 'fit-content', overflowY: 'scroll', overflowX: 'hidden', padding: 0 };
  const scrollContainerStyle2 = { width: 'auto', maxHeight: '500px', height: 'fit-content', overflowY: 'scroll', overflowX: 'hidden', padding: 0 };

  const API = 'https://jobify-app-v2.herokuapp.com/user/offers';

  async function getData() {
    const response = await superagent.get(`${API}`).set('authorization', `Basic ${context.token}`);
    setData(response.body);
  }
  const rejectApp = (id, payload) => {
    let status1 = '';
    if (payload === 'Rejected') {
      status1 = 'Rejected';
    } else {
      status1 = 'Accepted';
    }
    setLoader(true);
    superagent
      .put(`${API}/${id}`)
      .send({ status: status1 })
      .set({ Authorization: `Basic ${context.token}` })
      .then((data) => {
        getData();
        setLoader(false);
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
        <Row sm={8}>
          <Col style={{ color: '#515151', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>My Offers</Col>
        </Row>
        <If condition={context.token && data[0]}>
          <Then>
            <Container className='list-container' style={{ marginTop: '20px',padding:0 }} fluid>
              <Row sm={8} className='flexRow list-header' style={{ height: screenSize > '575' ? '80px' : '150px',margin:0 }}>
                <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} className='col-title' sm={1}></Col>
                <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} className='col-title' sm={2}>
                  Job Title
                </Col>
                <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={2}>
                  Company Name
                </Col>
                <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={2}>
                  Job Type
                </Col>
                <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={1}>
                  Country
                </Col>
                <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={1}>
                  Status
                </Col>
                <Col sm={2}>
                  <If condition={loader}>
                    <Col style={{ color: '#515151', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={3}>
                      <Spinner animation='border' variant='primary' />
                    </Col>
                  </If>
                </Col>
              </Row>
              <MDBContainer className='scrollbar scrollbar-primary  mt-5 mx-auto' style={screenSize > 575 ? scrollContainerStyle : scrollContainerStyle2}>
                {data.map((item) => {
                  return (
                    <Row className='flexRow list-body' sm={8}>
                      <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={1}>
                        <Image style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={item.logo} roundedCircle />
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#515151' }} sm={2}>
                        {item.title}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#515151' }} sm={2}>
                        {item.company_name}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#515151' }} sm={2}>
                        {item.type}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center' }} className='button-col' sm={1}>
                        {item.country}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', fontWeight: 600, color: item.status === 'Accepted' ? '#69D95B' : item.status === 'Rejected' ? '#B72525' : '#515151' }} sm={1}>
                        {item.status}
                      </Col>
                      <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', display: 'flex', flexDirection: 'row' }} className='button-col' sm={3}>
                        <Button className='button' onClick={() => rejectApp(item.id, 'Accepted')} variant='outline-light' style={{ backgroundColor: '#504edf', textAlign: 'center' }}>
                          Accept
                        </Button>
                        <Button className='button' onClick={() => rejectApp(item.id, 'Rejected')} variant='outline-light' style={{ backgroundColor: '#504edf', textAlign: 'center' }}>
                          Reject
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
              <Col style={{ color: '#717171', fontSize: 35, fontWeight: 400, textAlign: 'center', marginTop: 30 }}>You don't have any offer</Col>
            </Row>
          </Else>
        </If>
      </Container>
    </>
  );
}
