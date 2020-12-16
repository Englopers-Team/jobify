import { Container, Row, Col } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../context/auth';

import Spinner from 'react-bootstrap/Spinner';
import { If, Then } from 'react-if';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
export default function CompanyResults(props) {
  const context = useContext(AuthContext);

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  let results = props.results;
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
          <Container className='list-container' fluid>
            <Row sm={8} className='flexRow list-header' style={{ height: screenSize > '575' ? '80px' : '130px', textAlign: 'center' }}>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={2}>
                Logo
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} className='col-title' sm={3}>
                Company Name
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={1}>
                Location
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={2}>
                Company URL
              </Col>
              <Col style={{ color: '#717171', fontWeight: 660, textAlign: 'center' }} sm={2}>
                Phone
              </Col>
              <If condition={props.loader}>
                <Col style={{ color: '#717171', fontWeight: 660 }} sm={2}>
                  <Spinner animation='border' variant='primary' />
                </Col>
              </If>
            </Row>

            {results.map((item) => {
              return (
                <Row className='flexRow list-body' sm={8} style={{ marginTop: '10px', textAlign: 'center' }}>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    <Image style={{ width: '50px', height: '50px', objectFit: 'cover', textAlign: 'center' }} src={item.logo} roundedCircle />
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={3}>
                    {item.company_name}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={1}>
                    {item.country}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                    {item.company_url}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                    {item.phone}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                    <Button style={{ backgroundColor: '#504edf', textAlign: 'center', width: screenSize > '575' ? 'fit-content' : '', padding: screenSize > '575' ? '5px 12px' : '' }}>Connect</Button>
                  </Col>
                </Row>
              );
            })}
          </Container>
        </Then>
      </If>
    </>
  );
}
