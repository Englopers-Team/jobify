/* eslint-disable no-unused-vars */
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then } from 'react-if';
import Image from 'react-bootstrap/Image';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../../context/auth';

export default function CompanyResults(props) {
  const context = useContext(AuthContext);
  let results = props.results;
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [loader, setLoader] = useState(false);
  let history = useHistory();
  const [show, setShow] = useState(false);

  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    if (context.token) {
    }
    return () => {
      window.removeEventListener('resize', checkSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize, context.token]);
  return (
    <>
      <If condition={props.visable === 'noData'}>
        <Row style={{ backgroundColor: 'transparent', marginTop: 50 }} sm={8}>
          <Col style={{ color: '#717171', fontSize: 30, fontWeight: 500, textAlign: 'center' }}>No Results</Col>
        </Row>
      </If>
      <Container className='list-container' fluid>
        <If condition={props.visable === 'true'}>
          <Then>
            <Row sm={8} className='flexRow list-header2'>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} className='col-title2' sm={2}>
                Photo
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} className='col-title2' sm={2}>
                Name
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                Job Title
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={1}>
                Location
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={2}>
                Phone
              </Col>

              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={1}>
                <If condition={loader}>
                  <Spinner animation='border' variant='primary' />
                </If>
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={2}></Col>
              <Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-50w' aria-labelledby='example-custom-modal-styling-title'>
                <Modal.Header closeButton>
                  <Modal.Title id='example-custom-modal-styling-title'>Send Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Are you sure that you want to submit this job?</p>
                  <Button className='button' onClick={() => console.log('hu')} variant='outline-light' style={{ backgroundColor: '#504edf' }}>
                    Submit
                  </Button>
                </Modal.Body>
              </Modal>
            </Row>

            {results.map((item) => {
              return (
                <>
                  <Row sm={8} className='flexRow list-body'>
                    <Col style={{ fontWeight: 650, textAlign: screenSize > 575 ? 'center' : 'center' }} sm={2}>
                      <Image src={item.avatar} roundedCircle style={{ width: 50, height: 50, objectFit: 'cover' }} />
                    </Col>
                    <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={2}>
                      {item.first_name} {item.last_name}
                    </Col>
                    <Col style={{ textAlign: screenSize > 575 ? 'center' : 'center', color: '#9393A1' }} sm={2}>
                      {item.job_title}
                    </Col>
                    <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={1}>
                      {item.country}
                    </Col>
                    <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                      {item.phone}
                    </Col>
                    <Col style={{ textAlign: 'center' }} sm={1}>
                      <Button className='button' onClick={() => history.push(`submitted-jobs/${item.id}`)} style={{ backgroundColor: '#504edf', width: '100px' }}>
                        Message
                      </Button>
                    </Col>
                    <Col style={{ textAlign: 'center' }} sm={2}>
                      <Button
                        className='button'
                        onClick={() => {
                          setShow(true);
                        }}
                        style={{ backgroundColor: '#504edf', width: '100px' }}
                      >
                        Send Offer
                      </Button>
                    </Col>
                  </Row>
                </>
              );
            })}
          </Then>
        </If>
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
//           return (assName='flexRow list-body' sm={8}>
//               <Col style={{ fontWeight: 650 }} sm={4}>
//                 {item.first_name}
//               </Col>
//               <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
//                 {i
//             <Row cltem.last_name}
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
