/* eslint-disable array-callback-return */
// import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav, Modal, Spinner } from 'react-bootstrap';
// import { useContext, useState, useEffect } from 'react';
// import { If, Then, Else } from 'react-if';
// import superagent from 'superagent';
// import './styles.scss';

// import { useHistory } from 'react-router-dom';

// export default function Report() {
//   let history = useHistory();
//   const [data, setData] = useState([]);

//   async function getData() {
//     const API = 'https://jobify-app-v2.herokuapp.com';
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudF90eXBlIjoicCIsInByb2ZpbGUiOnsiaWQiOjEsImZpcnN0Ijoib3NhbWEiLCJsYXN0IjoiemF0YXIiLCJhdmF0YXIiOiJodHRwczovL2xpYnJhcnkua2lzc2NsaXBhcnQuY29tLzIwMTgwOTI5L29vcS9raXNzY2xpcGFydC1hdmF0YXItcGVyc29uLWNsaXBhcnQtYXZhdGFyLWNvbXB1dGVyLWljb25zLXBlcnNvbi04NzM1NWM1NmExNzQ4NDczLmpwZyIsImpvYl90aXRsZSI6IkRldmVsb3BlciIsImNvdW50cnkiOiJVU0EifSwiaWF0IjoxNjA3ODA4OTkyLCJleHAiOjM2MTYwNzgwODk5Mn0.N9ei6Q3kG4QNBXmDb4qGVDt0L_2HGk78VdJXTcjuvxY';
//     const response = await superagent.get(`${API}/reports`).set('authorization', `Basic ${token}`);
//     console.log('osamamamamamamammama', response.body);
//     setData(response.body);
//   }
//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
//       <Col style={{ justifyContent: 'flex-start' }} sm={4}>
//         {data.map((item) => {
//           let state = 'Closed';
//           let response = item.response;
//           if (item.response == null) {
//             state = 'Open';
//             response = '';
//           }

//           return (
//             <Container style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', border: 'solid 1px red', padding: '0' }}>
//               <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <Col style={{ padding: '20px', textAlign: 'left', fontSize: '25px' }}>{item.id}</Col>
//                 <Col style={{ padding: '20px', textAlign: 'right', fontSize: '25px' }}>
//                   <If condition={state == 'Closed'}>
//                     <Then>
//                       <p style={{ color: 'red' }}>{state}</p>
//                     </Then>
//                     <Else>
//                       <p style={{ color: 'green' }}>{state}</p>
//                     </Else>
//                   </If>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col style={{ padding: '0', textAlign: 'center', marginBottom: '20px' }}>{item.description}</Col>
//               </Row>
//               <Row>
//                 <Col style={{ padding: '0', textAlign: 'center', marginBottom: '20px' }}>{response}</Col>
//               </Row>
//             </Container>
//           );
//         })}
//       </Col>
//       <Col>
//         <Row></Row>
//       </Col>
//     </Container>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, FormControl } from 'react-bootstrap';
import superagent from 'superagent';
import { MDBContainer } from 'mdbreact';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

import '../search/styles.scss';
import './styles.scss';

export default function Reports() {
  let [data, setData] = useState([]);
  let [sort, setSort] = useState('All Reports');
  let [type, setType] = useState(false);
  let [sortId, setSortId] = useState('');
  const scrollContainerStyle = { width: 'auto', maxHeight: '400px', height: '400px', overflowY: 'scroll', overflowX: 'hidden', marginTop: '0 !important' };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudF90eXBlIjoicCIsInByb2ZpbGUiOnsiaWQiOjEsImZpcnN0Ijoib3NhbWEiLCJsYXN0IjoiemF0YXIiLCJhdmF0YXIiOiJodHRwczovL2xpYnJhcnkua2lzc2NsaXBhcnQuY29tLzIwMTgwOTI5L29vcS9raXNzY2xpcGFydC1hdmF0YXItcGVyc29uLWNsaXBhcnQtYXZhdGFyLWNvbXB1dGVyLWljb25zLXBlcnNvbi04NzM1NWM1NmExNzQ4NDczLmpwZyIsImpvYl90aXRsZSI6IkRldmVsb3BlciIsImNvdW50cnkiOiJVU0EifSwiaWF0IjoxNjA3ODA4OTkyLCJleHAiOjM2MTYwNzgwODk5Mn0.N9ei6Q3kG4QNBXmDb4qGVDt0L_2HGk78VdJXTcjuvxY';
    const response = await superagent.get(`${API}/reports`).set('authorization', `Basic ${token}`);
    setData(response.body);
  }

  function Result() {
    return data.map((item) => {
      if (item.response === type || (type === false && (Number(sortId) === item.id || sortId === ''))) {
        return (
          <Row className='flexRow list-body' sm={8}>
            <Col style={{ fontWeight: 650, justifyContent: 'center' }} sm={2}>
              {item.id}
            </Col>
            <Col style={{ justifyContent: 'center', color: '#9393A1', maxHeight: '20px' }} sm={6}>
              <p style={{ wordWrap: 'break-word' }}>
                {item.description.slice(0, 45)}
                {item.description.length > 45 ? '...' : ''}
              </p>
            </Col>
            <Col style={{ justifyContent: 'center', color: item.response === null ? 'green' : 'red' }} sm={2}>
              {item.response === null ? 'Open' : 'Closed'}
            </Col>
            <Col style={{ justifyContent: 'center' }} className='button-col' sm={2}>
              <Link style={{ textDecoration: 'none' }} className='button' variant='praimary' id='link' to={{ pathname: `/reports/submit/${item.id}` }}>
                Details
              </Link>
            </Col>
          </Row>
        );
      }
    });
  }

  return (
    <>
      <Container style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }}>
        <Row sm={6} style={{ justifyContent: 'center', alignItem: 'center', textAlign: 'center' }}>
          <Col sm={1} style={{ marginTop: '5px' }}>
            <Icon.Search size='25' />
          </Col>
          <Col sm={8}>
            <FormControl
              placeholder='Search By Report Number'
              className='input'
              style={{}}
              onChange={(e) => {
                setSortId(e.target.value);
              }}
            />
          </Col>
          <Col sm={3}>
            <Dropdown>
              <Dropdown.Toggle variant='Info' id='dropdown-basic'>
                {sort}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setType(false);
                    setSort('All Reports');
                  }}
                >
                  All Reports
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setType(null);
                    setSort('Open Reports');
                  }}
                >
                  Open Reports
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setType(true);
                    setSort('Close Reports');
                  }}
                >
                  Close Reports
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      <Container className='list-container' style={{ width: '40%' }}>
        <Row sm={6} className='flexRow list-header'>
          <Col style={{ color: '#717171', fontWeight: 550, justifyContent: 'center' }} className='col-title' sm={2}>
            Report Number
          </Col>
          <Col style={{ color: '#717171', fontWeight: 550, justifyContent: 'center' }} sm={6}>
            Description
          </Col>
          <Col style={{ color: '#717171', fontWeight: 550, justifyContent: 'center', padding: '0' }} sm={2}>
            State
          </Col>
          <Col style={{ color: '#717171', fontWeight: 550, justifyContent: 'center' }} sm={2}></Col>
        </Row>

        <MDBContainer className='scrollbar scrollbar-white  mt-5 mx-auto' style={scrollContainerStyle}>
          <Result />
        </MDBContainer>
      </Container>
    </>
  );
}
