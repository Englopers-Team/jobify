/* eslint-disable no-unused-vars */
import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav, Modal, Spinner, DropdownButton, Dropdown } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { If, Then } from 'react-if';
import { AuthContext } from '../../context/auth';
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

  const API = 'https://jobify-app-v2.herokuapp.com/user/offers';

  async function getData() {
    const response = await superagent.get(`${API}`).set('authorization', `Basic ${context.token}`);
    console.log('osama', response.body);
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
    console.log('Heerr', id, payload);
    superagent
      .put(`${API}/${id}`)
      .send({ status: status1 })
      .set({ Authorization: `Basic ${context.token}` })
      .then((data) => {
        console.log(data);
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
      <Container style={{ marginTop: '150px' }}>
        <Container style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '35px', fontWeight: 'bold', color: '#504edf' }}>My Offers</h2>
        </Container>
        <Container className='list-container' style={{ marginTop: '20px' }} fluid>
          <Row sm={8} className='flexRow list-header' style={{ height: screenSize > '575' ? '80px' : '150px' }}>
            <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} className='col-title' sm={1}></Col>
            <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} className='col-title' sm={2}>
              Job Title
            </Col>
            <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={2}>
              Company Name
            </Col>
            <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={2}>
              Job Type
            </Col>
            <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={1}>
              Country
            </Col>
            <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={1}>
              Status
            </Col>
            <Col sm={2}>
              <If condition={loader}>
                <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > '575' ? 'center' : 'center' }} sm={3}>
                  <Spinner animation='border' variant='primary' />
                </Col>
              </If>
            </Col>
          </Row>

          {data.map((item) => {
            return (
              <Row className='flexRow list-body' sm={8}>
                <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={1}>
                  <Image style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={item.logo} roundedCircle />
                </Col>
                <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={2}>
                  {item.title}
                </Col>
                <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={2}>
                  {item.company_name}
                </Col>
                <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={2}>
                  {item.type}
                </Col>
                <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center' }} className='button-col' sm={1}>
                  {item.country}
                </Col>
                <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={1}>
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
        </Container>
      </Container>
    </>
  );
}
