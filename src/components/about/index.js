import { Container, Image, Row, Col } from 'react-bootstrap';
import about from './undraw_completed_tasks_vs6q.svg';

export default function About() {
  return (
    <>
      <Container style={{ justifyContent: 'center', marginTop: '5rem' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px', marginBottom: 30 }}>
            <h2 style={{ color: '#504edf', fontSize: '45px', fontWeight: 'bold' }}>
              ABOUT <span style={{ color: '#515151', fontSize: '45px', fontWeight: 'bold' }}>US</span>
            </h2>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <Col md='5'>
            <p style={{ color: '#515151', fontSize: '20px', textAlign: 'justify' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;Welcome to <strong style={{ color: '#515151', fontSize: '20px' }}>Jobify</strong>, your number one source for all Jobs. We're dedicated to giving you the very best of Jobs, with a focus on all market fields. We now serve customers all over the world, and are thrilled that we're able to turn our passion into our own website. we hope you enjoy our Jobs as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us. Sincerely,&nbsp; <strong style={{ color: '#515151', fontSize: '20px' }}>Jobify Team.</strong>
            </p>
          </Col>
          <Col md='7' style={{ textAlign: 'center', marginBottom: '7rem' }}>
            <Image style={{ width: '60%' }} src={about} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
