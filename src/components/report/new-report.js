import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import superagent from 'superagent';
import './styles.scss';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory, useParams } from 'react-router-dom';
import { If } from 'react-if';

export default function SubmitReport() {
  const [body, setBody] = useState('');

  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com';
  const context = useContext(AuthContext);
  let history = useHistory();
  let { id } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleEditorChange = (content) => {
    setBody(content);
  };

  const handleSubmit = () => {
    superagent
      .post(`${API}/report`)
      .set({ Authorization: `Basic ${context.token}` })
      .send({ description: body })
      .then((data) => {
        history.push('/reports')
      });
  };

  return (
    <Container>
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
