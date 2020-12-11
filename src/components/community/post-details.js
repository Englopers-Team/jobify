import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/auth'
import { Container, Row, Col, Form, Button, Image, Card } from 'react-bootstrap';
import superagent from 'superagent'
import { If } from 'react-if'
import { useParams } from "react-router-dom";
import './styles.scss'

export default function PostDetails() {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [avatar, setAvatar] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [name, setName] = useState('')
  let { id } = useParams();

  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com'
  const context = useContext(AuthContext)

  useEffect(() => {

    const getPost = () => {
      superagent.get(`${API}/community/post/${id}`).set({ 'Authorization': `Basic ${context.token}` }).then((data) => {
        setTitle(data.body.title)
        setBody(data.body.body)
        setName(`${data.body.profile.name}`)
        setAvatar(data.body.profile.avatar)
        setJobTitle(data.body.profile.job_title)
        setComments(data.body.comments)
        let formatedDate = new Date(data.body.date)
        formatedDate = ((formatedDate.getMonth() > 8) ? (formatedDate.getMonth() + 1) : ('0' + (formatedDate.getMonth() + 1))) + '/' + ((formatedDate.getDate() > 9) ? formatedDate.getDate() : ('0' + formatedDate.getDate())) + '/' + formatedDate.getFullYear()
        setDate(formatedDate)
      })
    }
    if (context.token) {
      getPost()

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token])


  const Render = () => {
    return (
      <Container dangerouslySetInnerHTML={{ __html: body }}></Container>
    );
  }

  const Comments = () => {

    return comments.map((comm, index) => {
      return (
        <Card key={index} className='comment'>
          <Card.Body>
            <Card.Title>
              <Col sm={12} className='flexRow' style={{ justifyContent: 'flex-start', padding: 0, marginTop: '0px' }}>
                <Col style={{ padding: 0 }} sm={2} lg={1}>
                  <Image className='imgShadow' style={{ width: '32px', backgroundColor: 'transparent' }} src={comm.avatar} roundedCircle />
                </Col>
                <Col style={{ padding: 0 }}>
                  <h4 style={{ marginBottom: 0, fontSize: '14px', fontWeight: '600' }}>{comm.profile}</h4>
                  <p style={{ marginBottom: 0, fontSize: '12px' }}>{comm.job_title}</p>
                </Col>
              </Col>
            </Card.Title>
            <Card.Text>
              {comm.comment}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    })
  }

  const handleSubmit = () =>{

  }

  const Post = () => {
    return (
      <>
        <Row className='flexRow' style={{ alignItems: 'flex-start' }}>
          <Col sm={7}>
            <Row  >
              <Col sm={12} style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
                <h2 style={{ marginBottom: 0 }} >{title}</h2>
                <Col sm={12} className='flexRow' style={{ justifyContent: 'flex-start', padding: 0, marginTop: '30px' }}>
                  <Col style={{ padding: 0 }} sm={3} lg={2}>
                    <Image className='imgShadow' style={{ width: '72px' }} src={avatar} roundedCircle />
                  </Col>
                  <Col style={{ padding: 0 }}>
                    <h4 style={{ marginBottom: 0, fontSize: '20px', fontWeight: '600' }}>{name}</h4>
                    <p style={{ marginBottom: 0 }}>{jobTitle}</p>
                  </Col>
                  <Col style={{ textAlign: 'left' }}>
                    <p>{date}</p>
                  </Col>
                </Col>
              </Col>
            </Row>
            <Row className='flexCol' style={{ marginTop: '40px', marginBottom: '40px', justifyContent: 'center' }}>
              <Render />
            </Row>
          </Col>
          <Col  sm={5}>
            <Row >
              <h2>Comments</h2>
            </Row>
            <Row>
              <Col sm={12} className='flexRow' style={{ justifyContent: 'flex-start', padding: 0, marginTop: '30px' }}>
                <Col style={{ padding: 0 }} sm={3} lg={2}>
                  <Image className='imgShadow' style={{ width: '32px' }} src={context.user.profile.avatar} roundedCircle />
                </Col>
                <Col style={{ padding: 0 }}>
                  <h4 style={{ marginBottom: 0, fontSize: '14px', fontWeight: '600' }}>{context.user.profile.first} {context.user.profile.last}</h4>
                  <p style={{ marginBottom: 0, fontSize: '12px' }}>{context.user.profile.job_title}</p>
                </Col>
              </Col>
            </Row>
            <Row className='flexRow' style={{ marginTop: '10px', marginBottom: '20px' }}>
              <Form.Control required onChange={(e) => setComment(e.target.value)} style={{ width: '80%' }} className='input' type="text" placeholder="Say Something" />
              <Button onClick={() => handleSubmit()} variant='outline-dark' className='buttonTopic' size="sm" type="submit" style={{ marginTop: '0px',marginBottom:'4px', height: '40px', fontWeight: '500' }}>
                Submit
          </Button>
            </Row>
            <Row style={{ flexDirection: 'column' }}>
              <Comments />
            </Row>
          </Col>
        </Row>

      </>
    )
  }

  return (
    <Container>
      <If condition={context.user.profile}>
        <Post />
      </If>
    </Container>
  )
}