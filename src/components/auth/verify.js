import { useContext, useState } from 'react'
import { Container, Row, Col, Card, Image, Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/auth'
import './styles.scss'
import { useHistory } from "react-router-dom";
import superagent from 'superagent'
import { If } from 'react-if'

export default function Verify() {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  let history = useHistory();
  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com'

  const context = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const check = await superagent.get(`${API}/verify/${code}`).set({ 'Authorization': `Basic ${context.token}` })
    check.body ? history.push("/") : setError(true)
  }

  return (
    <Container className='cont'>
      <Row className='flexRow'>
        <Col m={5}>
          <Card style={{ padding: '6%', boxShadow: '0 0 10px #888888', borderRadius: '10px' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#6D6D6D' }}>Verify Your Email</Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '23%' }} />
            <Card.Text>
              Please verify your email address to get access to thousands of exclusive job listings.
            </Card.Text>
            <Form >
              <Form.Group style={{ marginBottom: '15px' }} controlId="formBasicEmail">
                <Form.Control required onChange={(e) => setCode(e.target.value)} className='input' type="text" placeholder="Code" />
              </Form.Group>
              <If condition={error}>
                <Alert style={{ margin: 0, padding: '5px', paddingBottom: '2px' }} variant="danger" onClose={() => setError(false)} dismissible>
                  <p style={{ fontSize: '15px', paddingTop: '10px', marginLeft: '10px' }}>Wrong code!</p>
                </Alert>
              </If>
              <Button onClick={(e) => handleSubmit(e)} variant='outline-dark' size="lg" className='button' block type="submit" style={{ marginTop: '20px', height: '40px', fontSize: '24px', fontWeight: '500' }}>
                Verify
              </Button>
            </Form>
          </Card>
        </Col>
        <Col sm={7} style={{ textAlign: 'center' }}>
          <Image style={{ width: '500px' }} src="../../assets/verify.png" rounded />
        </Col>
      </Row>
    </Container>
  )
}