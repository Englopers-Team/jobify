import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import superagent from 'superagent';
import './styles.scss';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from 'react-router-dom';
import { If } from 'react-if';
import { Link } from 'react-router-dom';

export default function SubmitReport() {
  const [body, setBody] = useState(' ');
  const [show, setShow] = useState(false);

  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com';
  const context = useContext(AuthContext);
  let history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleEditorChange = (content) => {
    console.log(content);
    content.startsWith('<p>') ? setBody(content.substring(0, content.length - 4).substring(3)) : setBody(content);
  };

  const handleSubmit = () => {
    superagent
      .post(`${API}/report`)
      .set({ Authorization: `Basic ${context.token}` })
      .send({ description: body })
      .then((data) => {

      });
    setShow(true);
  };

  return (
    <Container>
      <Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-50w' aria-labelledby='example-custom-modal-styling-title'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>Your Report Has Been Submitted Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Link to='/reports'> */}
            <Button className='button' onClick={() => {
              history.push('/reports')
              setShow(false)
            }} variant='outline-light' style={{ backgroundColor: '#504EDF' }}>
              Ok
            </Button>
          {/* </Link> */}
        </Modal.Body>
      </Modal>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
          <h2 style={{ marginBottom: 0 }}>New Report</h2>
        </Col>
      </Row>
      <Row className='flexCol' style={{ marginTop: '40px', justifyContent: 'center' }}>
        <If condition={body.length >= 0}>
          <Editor
            apiKey='vbaon8jny71c8uc0ebn1nn45htchbunbi6b9wp9v3e072trm'
            initialValue={body}
            init={{
              height: 500,
              menubar: false,
              plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
              toolbar:
                // eslint-disable-next-line no-multi-str
                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={handleEditorChange}
          />
        </If>
        <Row>
          <Button onClick={() => handleSubmit()} variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginTop: '20px', backgroundColor: '#232B4E', marginRight: '20px', height: '40px', fontWeight: '500' }}>
            Save
          </Button>
          <Button onClick={() => history.push(`/reports`)} variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginTop: '20px', marginLeft: '20px', height: '40px', fontWeight: '500' }}>
            Cancel
          </Button>
        </Row>
      </Row>
    </Container>
  );
}
