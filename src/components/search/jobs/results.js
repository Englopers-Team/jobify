import Table from 'react-bootstrap/Table';
import { Container, Row, Col } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
export default function JobsResults(props) {
  let results = props.results;
  return (
    <>
      <Container fluid>
        <Row className='flexRow'>
          <Col sm={4}>Title</Col>
          <Col sm={2}>Company</Col>
          <Col sm={2}>location</Col>
          <Col sm={2}>Type</Col>
          <Col sm={2}></Col>
        </Row>

        {results.map((item) => {
          return (
            <Row className='flexRow' sm={8}>
              <Col sm={4}>{item.title}</Col>
              <Col sm={2}>{item.company_name}</Col>
              <Col sm={2}>{item.location}</Col>
              <Col sm={2}>{item.type}</Col>
              <Col sm={2}>
                <Button onClick={console.log(item.email)} variant='praimary'>
                  Apply
                </Button>
              </Col>
            </Row>
          );
        })}
      </Container>
    </>
  );
}
