/* eslint-disable no-unused-vars */
import superagent from 'superagent';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Card, Image, Form, Button, Alert, Tab, Nav } from 'react-bootstrap';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import S3FileUpload from 'react-s3';
import { If } from 'react-if';
import { TruckFlatbed } from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';

const config = {
  bucketName: 'jobify',
  dirName: 'cv' /* optional */,
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
};

export default function UserEdit() {
  let history = useHistory();
  const context = useContext(AuthContext);

  const [data, setData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [cv, setCv] = useState('');
  const [avatar, setAvatar] = useState('');
  const [alert, setAlert] = useState([false, '', '']);
  const [isUploading, setIsUploading] = useState(false);

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
        if ((type = 'cv')) {
          setCv(data.location.replace(/ /g, '%20'));
        }
        if ((type = 'pic')) {
          setAvatar(data.location.replace(/ /g, '%20'));
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token]);

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${context.token}`);
    setData(response.body);
    setFirstName(response.body.first_name);
    setLastName(response.body.last_name);
    setPhone(response.body.phone);
    setJobTitle(response.body.job_title);
    setCv(response.body.cv);
    setAvatar(response.body.avatar);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (isUploading) {
      setAlert([true, 'Please Wait unit the upload is finished', 'warning']);
      return;
    }
    const API = 'https://jobify-app-v2.herokuapp.com/user/edit';
    await superagent.put(`${API}`).set('authorization', `Basic ${context.token}`).send({ first_name: firstName, last_name: lastName, phone: phone, job_title: jobTitle, country: data.country, age: data.age, avatar: avatar, experince: data.experince, cv: cv });
    history.push('/');
  }

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Row style={{ justifyContent: 'center' }}>
        <Col sm={8}>
          <Card style={{ padding: '6%', boxShadow: '0 0 10px #888888', borderRadius: '10px' }}>
            <Card.Title style={{ marginBottom: 5, fontSize: '28px', color: '#6D6D6D' }}>{data.first_name} Profile </Card.Title>
            <hr style={{ height: '1.5px', backgroundColor: '#504EDF', marginTop: 0, marginBottom: '30px', width: '23%' }} />

            <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
              <Form onSubmit={(e) => handleSubmit(e)} style={{ width: '80%' }}>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setFirstName(e.target.value)} className='input' type='text' value={firstName} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setLastName(e.target.value)} className='input' type='text' value={lastName} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }} controlId='formBasicEmail'>
                  <Form.Control required onChange={(e) => setPhone(e.target.value)} className='input' type='number' value={phone} />
                </Form.Group>

                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Control required onChange={(e) => setJobTitle(e.target.value)} className='input' type='text' value={jobTitle} />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label>CV</Form.Label>
                  <Form.Control onChange={(e) => uploadFile(e, 'cv')} className='input' type='file' placeholder='CV' />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label>Photo</Form.Label>
                  <Form.Control onChange={(e) => uploadFile(e, 'pic')} className='input' type='file' placeholder='Profile Picture' />
                </Form.Group>
                <If condition={alert[0]}>
                  <Alert style={{ margin: 0, padding: '5px', paddingBottom: '2px', marginBottom: 10 }} variant={alert[2]} onClose={() => setAlert([false, '', ''])} dismissible>
                    <p style={{ fontSize: '15px', paddingTop: '10px', marginLeft: '10px' }}>{alert[1]}</p>
                  </Alert>
                </If>
                <Button variant='outline-dark' size='lg' className='buttongg' block type='submit' style={{ marginBottom: '50px', height: '40px', fontSize: '24px', fontWeight: '500' }}>
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
