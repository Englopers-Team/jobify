import { Container, Row, Col } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../context/auth';

import Spinner from 'react-bootstrap/Spinner';
import { If, Then, Else } from 'react-if';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
export default function CompanyResults(props) {
  const context = useContext(AuthContext);

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  // let results = props.results;
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
      <If condition={props.visable}>
        <Then>
          <If condition={props.results[0]}>
            <Then>
              <Container className='list-container' style={{ width: '90%' }} fluid>
                <Row sm={8} className='flexRow list-header' style={{ height: screenSize > '575' ? '80px' : '130px', textAlign: 'center', dispaly: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={2}>
                    
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} className='col-title' sm={3}>
                    Company Name
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={2}>
                    Location
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={3}>
                    Company URL
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={2}>
                    Phone
                  </Col>
                  
                </Row>

                {props.results.map((item) => {
                  return (
                    <Row className='flexRow list-body' sm={8} style={{ marginTop: '10px', textAlign: 'center', paddingLeft: 0, paddingRight: 0, dispaly: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                        <Image style={{ width: '50px', height: '50px', objectFit: 'cover', textAlign: 'center' }} src={item.logo} roundedCircle />
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={3}>
                        {item.company_name}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                        {item.country}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={3}>
                        {item.company_url}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                        {item.phone}
                      </Col>
                    </Row>
                  );
                })}
              </Container>
            </Then>
            <Else>
              <Container style={{ justifyContent: 'center', marginTop: '30px' }}>
                <Col sm={12} style={{ color: '#717171', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>
                  NO RESULTS
                </Col>
              </Container>
            </Else>
          </If>
        </Then>
      </If>
    </>
  );
}
