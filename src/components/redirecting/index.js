import { Container, Image, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import err from './undraw_page_not_found_su7k.svg';

export default function NotFound() {
  return (
    <>
      <Container style={{ justifyContent: 'center' }}>
        <Row style={{ justifyContent: 'center' }}>
          <Spinner style={{ width: '70%' }} animation='border' variant='primary' />
          {/* <Image style={{ width: '70%' }} src={err} /> */}
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <Link to={{ pathname: '/' }}>
            <h1>Go back home</h1>
          </Link>
        </Row>
      </Container>
    </>
  );
}
