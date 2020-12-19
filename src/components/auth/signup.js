import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav } from 'react-bootstrap';
import { If } from 'react-if';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import S3FileUpload from 'react-s3';

const config = {
  bucketName: 'jobify',
  dirName: 'cv' /* optional */,
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
};
const defaultAvatar = 'https://dl.dropboxusercontent.com/s/zc4nrkuosrtlmbt/google.jpg?dl=0';
export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [logoFile, setLogoFile] = useState(defaultAvatar);
  const [url, setURL] = useState('');
  const [error, setError] = useState(false);
  const [cvFile, setCVFile] = useState('No CV');
  const [avatarFile, setAvatarFile] = useState(defaultAvatar);

  let history = useHistory();

  const context = useContext(AuthContext);

  const uploadCv = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        setCVFile(data.location.replace(/ /g, '%20'));
      })
      .catch((err) => setError(err));
  };

  const uploadAvatar = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        setAvatarFile(data.location.replace(/ /g, '%20'));
      })
      .catch((err) => setError(err));
  };

  const uploadLogo = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        setLogoFile(data.location);
      })
      .catch((err) => setError(err));
  };

  const handleSubmitApplicant = async (e) => {
    e.preventDefault();
    const payload = { firstName, lastName, email, phone, jobTitle, country, password, cv: cvFile, avatar: avatarFile };
    const check = await context.signup(payload, 'p');
    check ? history.push('/verify') : setError(true);
  };

  const handleSubmitCompany = async (e) => {
    e.preventDefault();
    const payload = { companyName, email, phone, logo: logoFile, url, country, password };
    const check = await context.signup(payload, 'c');
    check ? history.push('/verify') : setError(true);
  };

  return (
    <Container style={{ marginTop: '100px', marginBottom: '50px' }}>
      <meta name='google-signin-client_id' content='60556511916-bh8hf6uf6hoagsua5f5cbtnf9pnja6pu.apps.googleusercontent.com' />
      <Row>
        <Col sm={6}>
          <Card style={{ padding: '6%', boxShadow: '0 0 10px #888888', borderRadius: '10px' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#6D6D6D' }}>Sign up</Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '23%' }} />
            <Tab.Container defaultActiveKey='applicant'>
              <Row>
                <Col>
                  <Nav variant='pills' className='flexRow'>
                    <Nav.Item>
                      <Nav.Link eventKey='applicant'>Applicant</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='company'>Recruiter</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
              <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                <Tab.Content style={{ width: '70%' }}>
                  <Tab.Pane eventKey='applicant'>
                    <Form onSubmit={handleSubmitApplicant}>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setFirstName(e.target.value)} className='input' type='text' placeholder='First name' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setLastName(e.target.value)} className='input' type='text' placeholder='Last name' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }} controlId='formBasicEmail'>
                        <Form.Control required onChange={(e) => setEmail(e.target.value.toLowerCase())} className='input' type='email' placeholder='Email' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setPhone(e.target.value)} className='input' type='number' placeholder='Phone number' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setJobTitle(e.target.value)} className='input' type='text' placeholder='Job title' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setCountry(e.target.value)} className='input' type='text' placeholder='Country' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Label>CV</Form.Label>
                        <Form.Control onChange={(e) => uploadCv(e)} className='input' type='file' placeholder='CV' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control onChange={(e) => uploadAvatar(e)} className='input' type='file' placeholder='Profile Picture' />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control required onChange={(e) => setPassword(e.target.value)} className='input' type='password' placeholder='Password' />
                      </Form.Group>
                      <If condition={error}>
                        <Alert style={{ margin: 0, padding: '5px', paddingBottom: '2px' }} variant='danger' onClose={() => setError(false)} dismissible>
                          <p style={{ fontSize: '15px', paddingTop: '10px', marginLeft: '10px' }}>Wrong email or password!</p>
                        </Alert>
                      </If>
                      <Form.Group className='flexRow' style={{ justifyContent: 'space-around', marginBottom: '30px', marginTop: '50px' }}>
                        <a href='https://jobify-app-v2.herokuapp.com/auth/facebook'>
                          <Image style={{ width: '42px' }} src='https://www.flaticon.com/svg/static/icons/svg/145/145802.svg' roundedCircle />
                        </a>
                        <a href='https://accounts.google.com/o/oauth2/v2/auth?client_id=60556511916-bh8hf6uf6hoagsua5f5cbtnf9pnja6pu.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fjobify-app-v2.herokuapp.com%2Foauth-google&response_type=code&scope=profile%20email&fetch_basic_profile=true'>
                          <Image style={{ width: '42px' }} src='https://www.flaticon.com/svg/static/icons/svg/281/281764.svg' roundedCircle />
                        </a>
                        <a href='https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77ja8aiam3pogu&redirect_uri=https%3A%2F%2Fjobify-app-v2.herokuapp.com%2Foauth-linkedin&scope=r_liteprofile%20r_emailaddress'>
                          {' '}
                          <Image style={{ width: '42px' }} src='https://www.flaticon.com/svg/static/icons/svg/145/145807.svg' roundedCircle />
                        </a>
                      </Form.Group>
                      <Button variant='outline-dark' size='lg' className='button' block type='submit' style={{ marginBottom: '50px', height: '40px', fontSize: '24px', fontWeight: '500', paddingBottom: 40 }}>
                        Sign up
                      </Button>
                    </Form>
                  </Tab.Pane>
                  <Tab.Pane eventKey='company'>
                    <Form onSubmit={handleSubmitCompany}>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setCompanyName(e.target.value)} className='input' type='text' placeholder='Company name' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setEmail(e.target.value)} className='input' type='email' placeholder='Email' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setPhone(e.target.value)} className='input' type='number' placeholder='Phone number' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Label>Logo</Form.Label>
                        <Form.Control onChange={(e) => uploadLogo(e)} className='input' type='file' placeholder='Logo' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setURL(e.target.value)} className='input' type='url' placeholder='Company Website' />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Control required onChange={(e) => setCountry(e.target.value)} className='input' type='text' placeholder='Country' />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control required onChange={(e) => setPassword(e.target.value)} className='input' type='password' placeholder='Password' />
                      </Form.Group>
                      <If condition={error}>
                        <Alert style={{ margin: 0, padding: '5px', paddingBottom: '2px' }} variant='danger' onClose={() => setError(false)} dismissible>
                          <p style={{ fontSize: '15px', paddingTop: '10px', marginLeft: '10px' }}>Wrong email or password!</p>
                        </Alert>
                      </If>
                      <Button variant='outline-dark' size='lg' className='button' block type='submit' style={{ marginBottom: '50px', marginTop: '122px', height: '40px', fontSize: '24px', fontWeight: '500', paddingBottom: 40 }}>
                        Sign up
                      </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Row>
            </Tab.Container>
          </Card>
        </Col>
        <Col sm={6}>
          <Row style={{ height: '40%' }}></Row>
          <Row style={{ justifyContent: 'center', marginBottom: '70px' }}>
            <Image style={{ width: '600px', maxWidth: '100%' }} src='../../assets/signup.png' rounded />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
