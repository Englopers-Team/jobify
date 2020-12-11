import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { If, Then } from 'react-if';

import Button from 'react-bootstrap/Button';
export default function JobsResults(props) {
  let results = props.results;
  return (
    <>
      <If condition={props.visable}>
        <Then>
          <Container className='list-container' fluid>
            <Row sm={8} className='flexRow list-header'>
              <Col style={{ color: '#717171', fontWeight: 550 }} className='col-title' sm={4}>
                Job Title
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                Company{' '}
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                Location
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                Type
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
                    {item.title}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.company_name}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.location}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.type}
                  </Col>
                  <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                    <Button className='button' onClick={console.log(item.email)} variant='praimary'>
                      Save
                    </Button>
                  </Col>
                  <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                    <Button className='button' onClick={console.log(item.email)} variant='praimary'>
                      Apply
                    </Button>
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
