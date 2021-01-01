/* eslint-disable react-hooks/exhaustive-deps */
import superagent from 'superagent';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { If, Else } from 'react-if';
import './styles.scss';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';
import S3FileUpload from 'react-s3';
import { v4 as uuidv4 } from 'uuid';

const config = {
  bucketName: 'jobify',
  dirName: 'cv' /* optional */,
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
};

export default function CompanyEdit() {
  const [data, setData] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');
  const [country, setCountry] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const history = useHistory();
  const context = useContext(AuthContext);
  const [alert, setAlert] = useState([false, '', '']);
  const [isUploading, setIsUploading] = useState(false);

  const API = 'https://jobify-app-v2.herokuapp.com';

  const uploadFile = (e, type) => {
    setIsUploading(true);
    let file = e.target.files[0];
    let fileType = file.name.split('.')[1];
    if (!['pdf', 'doc', 'docx'].includes(fileType.toLowerCase()) && type === 'cv') {
      setAlert([true, 'We accept PDF, DOC and DOCX files Only', 'danger']);
      return;
    }
    if (!['png', 'jpg', 'jpeg', 'gif'].includes(fileType.toLowerCase()) && type === 'pic') {
      setAlert([true, 'We accept PNG, JPG, and JPEG files Only', 'danger']);
      return;
    }
    if (file.size > 2000000) {
      setAlert([true, 'Max file size is 2MB', 'danger']);
      return;
    }
    let fileName = `${uuidv4()}.${fileType}`;
    var blob = file.slice(0, file.size);
    let newFile = new File([blob], fileName, { type: file.type });
    setAlert([true, 'Uploading, Please wait ...', 'primary']);
    S3FileUpload.uploadFile(newFile, { ...config, dirName: type })
      .then((data) => {
        setLogo(data.location.replace(/ /g, '%20'));

        setIsUploading(false);
        setAlert([true, 'Uploaded Successfully', 'success']);
      })
      .catch((err) => {
        setAlert([true, err, 'danger']);
      });
  };
  useEffect(() => {
    if (context.token) {
      getData();
    }
  }, [context.token]);

  async function getData() {
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${context.token}`);
    console.log(response.body);
    setData(response.body);
    setCompanyName(response.body.company_name);
    setPhone(response.body.phone);
    setLogo(response.body.logo);
    setCountry(response.body.country);
    setCompanyUrl(response.body.company_url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isUploading) {
      setAlert([true, 'Please Wait unit the upload is finished', 'warning']);
      return;
    }
    await superagent.put(`${API}/company/edit`).set('authorization', `Basic ${context.token}`).send({ company_name: companyName, phone: phone, logo: logo, country: country, company_url: companyUrl });
    history.push('/');
  }

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Row sm={8}>
        <Col style={{ color: '#717171', fontSize: 40, fontWeight: 700, textAlign: 'center', marginBottom: '30px' }}>Edit Profile</Col>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Col sm={8}>
          <Card style={{ padding: '6%', boxShadow: '0 0 10px #888888', borderRadius: '10px' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#515151' }}>{data.company_name} Profile </Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '65%' }} />

            <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
              <Form onSubmit={(e) => handleSubmit(e)} style={{ width: '80%' }}>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control required onChange={(e) => setCompanyName(e.target.value)} className='input' type='text' value={companyName} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control required onChange={(e) => setPhone(e.target.value)} className='input' type='text' value={phone} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label>Logo</Form.Label>
                  <Form.Control onChange={(e) => uploadFile(e, 'pic')} className='input' type='file' placeholder='Logo' />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label>Location</Form.Label>
                  <Form.Control required onChange={(e) => setCountry(e.target.value)} className='input' type='text' value={country} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label>Website</Form.Label>
                  <Form.Control required onChange={(e) => setCompanyUrl(e.target.value)} className='input' type='text' value={companyUrl} />
                </Form.Group>

                <If condition={alert[0]}>
                  <Alert style={{ margin: 0, padding: '5px', paddingBottom: '2px' }} variant={alert[2]} onClose={() => setAlert([false, '', ''])} dismissible>
                    <p style={{ fontSize: '15px', paddingTop: '10px', marginLeft: '10px' }}>{alert[1]}</p>
                  </Alert>
                </If>
                <Button variant='outline-dark' size='lg' className='buttongg' block type='submit' style={{ marginBottom: '40px', marginTop: 50, height: '40px', fontSize: '24px', fontWeight: '500', paddingBottom: 40 }}>
                  Save
                </Button>
              </Form>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
