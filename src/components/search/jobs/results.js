import Table from 'react-bootstrap/Table';
import { Container, Row, Col } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
export default function JobsResults(props) {
  let results = props.results;
  return (
    <>
      <Container fluid>
        <Row sm={10}>
          <Col>Title</Col>
          <Col>Company</Col>
          <Col>location</Col>
          <Col>Type</Col>
          <Col></Col>
        </Row>

        {results.map((item) => {
          return (
            <Row sm={10}>
              <Col>{item.title}</Col>
              <Col>{item.company_name}</Col>
              <Col>{item.location}</Col>
              <Col>{item.type}</Col>
              <Button onClick={console.log(item.email)} variant='praimary'>
                Apply
              </Button>
            </Row>
          );
        })}
      </Container>
    </>
  );
}
