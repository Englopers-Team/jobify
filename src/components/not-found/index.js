import { Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import err from './404.gif';

export default function NotFound() {
  return (
    <>
      <Container style={{ justifyContent: 'center' }}>
        <Row style={{ justifyContent: 'center' }}>
          <Image style={{ width: '100%' }} src={err} />
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
