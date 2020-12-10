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
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'left' }} className='col-title' sm={2}>
                First Name
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Last Name
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Job Title
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Phone
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550, textAlign: 'center' }} sm={2}>
                Location
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
                    {item.first_name}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.last_name}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.job_title}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.location}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.phone}
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
