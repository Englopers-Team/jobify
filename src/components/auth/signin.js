import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Container, Row, Col, Card, Image, Form, Button, Alert } from 'react-bootstrap';
import { If } from 'react-if'
import './styles.scss'
import { useHistory } from "react-router-dom";


export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory();

  const context = useContext(AuthContext)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const check = await context.login(email, password)
    if (check) history.push("/")
  }

  return (
    <Container>
      <meta name="google-signin-client_id"
        content="60556511916-bh8hf6uf6hoagsua5f5cbtnf9pnja6pu.apps.googleusercontent.com" />
      <Row className='flexRow'>
        <Col sm={6}>
          <Card style={{ padding: '6%', boxShadow: '0 0 10px #888888', borderRadius: '10px' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#6D6D6D' }}>Sign in</Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '23%' }} />
            <Form onSubmit={handleSubmit}>
              <Form.Group style={{ marginBottom: '15px' }} controlId="formBasicEmail">
                <Form.Control required onChange={(e) => setEmail(e.target.value)} className='input' type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control required onChange={(e) => setPassword(e.target.value)} className='input' type="password" placeholder="Password" />
              </Form.Group>
              <If condition={context.error}>
                <Alert style={{ margin: 0, padding: '5px', paddingBottom: '2px' }} variant="danger" onClose={() => context.setError(false)} dismissible>
                  <p style={{ fontSize: '15px', paddingTop: '10px', marginLeft: '10px' }}>Wrong email or password!</p>
                </Alert>
              </If>
              <Form.Group className='flexRow' style={{ justifyContent: 'space-around', marginBottom: '30px', marginTop: '50px' }} controlId="formBasicPassword">
                <a href='https://jobify-app-v2.herokuapp.com/auth/facebook'><Image style={{ width: '42px' }} src="https://www.flaticon.com/svg/static/icons/svg/145/145802.svg" roundedCircle /></a>
                <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=60556511916-bh8hf6uf6hoagsua5f5cbtnf9pnja6pu.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fjobify-app-v2.herokuapp.com%2Foauth-google&response_type=code&scope=profile%20email&fetch_basic_profile=true"><Image style={{ width: '42px' }} src="https://www.flaticon.com/svg/static/icons/svg/281/281764.svg" roundedCircle /></a>
                <a href='https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77ja8aiam3pogu&redirect_uri=https%3A%2F%2Fjobify-app-v2.herokuapp.com%2Foauth-linkedin&scope=r_liteprofile%20r_emailaddress'> <Image style={{ width: '42px' }} src="https://www.flaticon.com/svg/static/icons/svg/145/145807.svg" roundedCircle /></a>
              </Form.Group>
              <Button variant='outline-dark' size="lg" className='button' block type="submit" style={{ marginBottom: '50px', height: '40px', fontSize: '24px', fontWeight: '500' }}>
                Sign in
              </Button>
            </Form>
          </Card>
        </Col>
        <Col sm={6}>

          <Row style={{justifyContent:'center'}}>

            <Image style={{ width: '70%' }} src="../../assets/signup.png" rounded />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}