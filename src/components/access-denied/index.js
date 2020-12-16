import deny from './undraw_Notify_re_65on.svg';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NoAccess() {
  return (
    <>
      <Container style={{ justifyContent: 'center', marginTop: '4rem' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col style={{ height: '90%', borderRadius: '2px', marginBottom: 30, textAlign: 'center' }}>
            <h2 style={{ color: '#515151', fontSize: '35px', fontWeight: 'bold' }}>
              You Are Not Allowed To Access <span style={{ color: '#504edf', fontSize: '45px', fontWeight: 'bold' }}>This Page</span>
            </h2>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <Image style={{ width: '50%' }} src={deny} />
        </Row>
        <Row style={{ justifyContent: 'center', marginTop: '3rem' }}>
          <Link to={{ pathname: '/' }}>
            <h1>Back To Home</h1>
          </Link>
        </Row>
      </Container>
    </>
  );
}
