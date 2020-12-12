import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then } from 'react-if';
import Image from 'react-bootstrap/Image';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import '../styles.scss';
import superagent from 'superagent';
import { NavLink, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
export default function CompanyResults(props) {
  let results = props.results;
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [loader, setLoader] = useState(false);
  let history = useHistory();
  const [show, setShow] = useState(false);
  return (
    <>
      <Container className='list-container' fluid>
        <Row sm={12} className='flexRow list-header2'>
          <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} className='col-title2' sm={2}>
            Photo
          </Col>
          <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} className='col-title2' sm={2}>
            Name
          </Col>
          <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2}>
            Job Title
          </Col>
          <Col style={{ color: '#717171', fontWeight: 550, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2}>
            Location
          </Col>
          <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
            Phone
          </Col>
          <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1.5}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </Col>
          <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={1}>
            <If condition={loader}>
              <Spinner animation='border' variant='primary' />
            </If>
          </Col>
        </Row>
        <Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-50w' aria-labelledby='example-custom-modal-styling-title'>
          <Modal.Header closeButton>
            <Modal.Title id='example-custom-modal-styling-title'>Delete Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure that you want to DELETE this job?</p>
            <Button className='button' onClick={() => console.log('hu')} variant='outline-light' style={{ backgroundColor: '#E85D67' }}>
              Delete
            </Button>
          </Modal.Body>
        </Modal>

        {results.map((item) => {
          return (
            <>
              <Row className='flexRow list-body' sm={10}>
                <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'left' : 'center' }} sm={2} lg={1}>
                  <Image src={item.avatar} roundedCircle style={{ width: 50, height: 50, objectFit: 'cover' }} />
                </Col>
                <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={2}>
                  {item.first_name} {item.last_name}
                </Col>
                <Col style={{ textAlign: screenSize > 575 ? 'left' : 'center', color: '#9393A1' }} sm={2}>
                  {item.job_title}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2} lg={1}>
                  {item.country}
                </Col>
                <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                  {item.phone}
                </Col>
                <Row sm={2}>
                  <Col style={{ textAlign: 'center' }} sm={1.5}>
                    <Button className='button' onClick={() => history.push(`submitted-jobs/${item.id}`)} variant='outline-light' style={{ backgroundColor: '#363B59' }}>
                      Message
                    </Button>
                  </Col>
                  <Col style={{ textAlign: 'center' }} sm={1.5}>
                    <Button
                      className='button'
                      onClick={() => {
                        setShow(true);
                      }}
                      variant='outline-light'
                      style={{ backgroundColor: '#E85D67' }}
                    >
                      Send Offer
                    </Button>
                  </Col>
                </Row>
              </Row>
            </>
          );
        })}
      </Container>
    </>
  );
}

// <>
//   <If condition={props.visable}>
//     <Then>
//       <Container className='list-container' fluid>
//         <Row sm={8} className='flexRow list-header'>
//           <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'left' }} className='col-title' sm={2}>
//             First Name
//           </Col>
//           <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
//             Last Name
//           </Col>
//           <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
//             Job Title
//           </Col>
//           <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
//             Phone
//           </Col>
//           <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
//             Location
//           </Col>
//           <If condition={props.loader}>
//             <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
//               <Spinner animation='border' variant='primary' />
//             </Col>
//           </If>
//         </Row>

//         {results.map((item) => {
//           return (
//             <Row className='flexRow list-body' sm={8}>
//               <Col style={{ fontWeight: 650 }} sm={4}>
//                 {item.first_name}
//               </Col>
//               <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
//                 {item.last_name}
//               </Col>
//               <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
//                 {item.job_title}
//               </Col>
//               <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
//                 {item.country}
//               </Col>
//               <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
//                 <Image style={{ width: '50px' }} src={item.avatar} roundedCircle />
//               </Col>
//             </Row>
//           );
//         })}
//       </Container>
//     </Then>
//   </If>
// </>
