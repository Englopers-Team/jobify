import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then } from 'react-if';
import Image from 'react-bootstrap/Image';
export default function CompanyResults(props) {
  let results = props.results;
  return (
    <>
      <If condition={props.visable}>
        <Then>
          <Container className='list-container' fluid>
            <Row sm={8} className='flexRow list-header'>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'left' }} className='col-title' sm={4}>
                Company Name
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Location{' '}
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Company URL
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Phone
              </Col>
              <If condition={props.loader}>
                <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                  <Spinner animation='border' variant='primary' />
                </Col>
              </If>
            </Row>

            {results.map((item) => {
              return (
                <Row className='flexRow list-body' sm={8}>
                  <Col style={{ fontWeight: 650 }} sm={4}>
                    {item.company_name}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.country}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.company_url}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.phone}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    <Image style={{ width: '50px' }} src={item.logo} roundedCircle />
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
