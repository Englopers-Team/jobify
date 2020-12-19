import { Container, Image, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import err from './808.svg';

export default function NotFound() {
  return (
    <>
      <Container style={{ justifyContent: 'center', marginTop: '5rem' }}>
        <Row style={{ justifyContent: 'center' }}>
          {/* <Spinner animation='border' variant='primary' size='lg' /> */}
          <Image style={{ width: '25%', marginBottom: '1rem' }} src={err} />
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <Link to={{ pathname: '/' }}>
            <h3 style={{ color: '#515151' }}>Redirecting Please Wait...</h3>
          </Link>
        </Row>
      </Container>
    </>
  );
}
