import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import superagent from 'superagent'
import './styles.scss'
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from "react-router-dom";


export default function SubmitPost() {
  let history = useHistory();
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');

  const context = useContext(AuthContext)
  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com'

  const handleEditorChange = (content, editor) => {
    setBody(content)
  }

  const handleSubmit = () => {
    console.log(context.user)
    const payload = {
      title,
      body
    }
    superagent.post(`${API}/community/submit`).set({ 'Authorization': `Basic ${context.token}` }).send(payload).then((data) => {
      history.push(`/community/posts/${data.body._id}`)
      // console.log(data.body._id)
    })
  };



  // const Render = () => {
  //   return (
  //     <Container dangerouslySetInnerHTML={{ __html: body }}></Container>
  //   );
  // }

  return (
    <Container>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
          <h2 style={{ marginBottom: 0 }} >New Topic</h2>
          <Form.Control required onChange={(e) => setTitle(e.target.value)} style={{ width: '30%' }} className='input' type="text" placeholder="Title" />
        </Col>
      </Row>
      <Row className='flexCol' style={{ marginTop: '40px', justifyContent: 'center' }}>
        <Editor
          apiKey="vbaon8jny71c8uc0ebn1nn45htchbunbi6b9wp9v3e072trm"
          initialValue=""
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

        <Button onClick={() => handleSubmit()} variant='outline-dark' className='buttonTopic' size="lg" type="submit" style={{ marginTop: '20px', height: '40px', fontWeight: '500' }}>
          Submit
          </Button>
      </Row>
      {/* <Render /> */}
    </Container>
  )
}