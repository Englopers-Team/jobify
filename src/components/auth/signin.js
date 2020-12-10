import { useEffect } from 'react'
import superagent from 'superagent'
import { Container, Row, Col, Card, Image, Form } from 'react-bootstrap';
import './styles.scss'

export default function Signin() {

  useEffect(() => {
    const test = async () => {
      // axois({
      //   method: 'GET',
      //   url: 'http://localhost:4000/user/app',
      // }).then(data => console.log(data.data))
      superagent.get('http://localhost:4000/user/app').withCredentials().then((data) => {
        console.log(data.body)
      })
    }
    test()
  }, [])

  return (
    <Container>
      <Row className='flexRow'>
        <Col sm={5}>
          <Card style={{ padding: '6%' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px' }}>Sign in</Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, width: '23%' }} />
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control className='input' type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control className='input' type="password" placeholder="Password" />
              </Form.Group>
              {/* <Button variant="primary" type="submit">
                Submit
              </Button> */}
            </Form>
          </Card>
        </Col>
        <Col sm={6}>
          <Row>

          </Row>
          <Row>

            <Image style={{ width: '600px' }} src="../../assets/signup.png" rounded />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}