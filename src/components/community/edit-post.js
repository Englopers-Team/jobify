import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/auth'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import superagent from 'superagent'
import './styles.scss'
import { Editor } from '@tinymce/tinymce-react';
import { useHistory, useParams } from "react-router-dom";
import { If } from 'react-if'

export default function EditPost() {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');

  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com'
  const context = useContext(AuthContext)
  let history = useHistory();
  let { id } = useParams();

  useEffect(() => {

    const getPost = () => {
      superagent.get(`${API}/community/post/${id}`).set({ 'Authorization': `Basic ${context.token}` }).then((data) => {
        setTitle(data.body.title)
        setBody(data.body.body)
      })
    }
    if (context.token) {
      getPost()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token])

  const handleEditorChange = (content, editor) => {
    setBody(content)
  }

  const handleSubmit = () => {
    const payload = {
      title,
      body
    }
    superagent.patch(`${API}/community/post/${id}`).set({ 'Authorization': `Basic ${context.token}` }).send(payload).then((data) => {
      history.push(`/community/posts/${id}`)
      // console.log(data.body._id)
    })
  };

  return (
    <Container>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
          <h2 style={{ marginBottom: 0 }} >Edit Topic</h2>
          <Form.Control required onChange={(e) => setTitle(e.target.value)} value={title} style={{ width: '30%' }} className='input' type="text" placeholder="Title" />
        </Col>
      </Row>
      <Row className='flexCol' style={{ marginTop: '40px', justifyContent: 'center' }}>
        <If condition={body.length > 0}>
          <Editor
            apiKey="vbaon8jny71c8uc0ebn1nn45htchbunbi6b9wp9v3e072trm"
            initialValue={body}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                // eslint-disable-next-line no-multi-str
                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleEditorChange}
          />
        </If>
        <Row>
          <Button onClick={() => handleSubmit()} variant='outline-dark' className='buttonTopic' size="lg" type="submit" style={{ marginTop: '20px', backgroundColor: '#232B4E', marginRight: '20px', height: '40px', fontWeight: '500' }}>
            Save
          </Button>
          <Button onClick={() => history.push(`/community/posts/${id}`)} variant='outline-dark' className='buttonTopic' size="lg" type="submit" style={{ marginTop: '20px', marginLeft: '20px', height: '40px', fontWeight: '500' }}>
            Cancel
          </Button>
        </Row>
      </Row>
    </Container>
  )
}