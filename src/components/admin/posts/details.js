import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { BookmarkStarFill } from 'react-bootstrap-icons';
import { If, Then, Else } from 'react-if'
import { MDBContainer } from "mdbreact";
import AdminHeader from '../../header/admin';


import { useHistory, useParams } from "react-router-dom";
import './styles.scss';
import { AuthContext } from '../../../context/auth'

import '../../community/styles.scss'

export default function PostDetails() {
  let { id } = useParams();
  let history = useHistory();

  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState([]);
  const [avatar, setAvatar] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [name, setName] = useState('')
  const [pin, setPin] = useState(false)
  const context = useContext(AuthContext)


  const API = 'https://jobify-app-v2.herokuapp.com';
  const scrollContainerStyle = { maxHeight: "500px", height: '500px', overflowY: 'scroll', overflowX: 'hidden' };

  useEffect(() => {
    if (context.token) {
      getPost()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token])



  const getPost = () => {
    superagent.get(`${API}/admin/posts/${id}`).set({ 'Authorization': `Basic ${context.token}` }).then((data) => {
      setComments(data.body.comments)
      setTitle(data.body.title)
      setBody(data.body.body)
      setName(`${data.body.profile.name}`)
      setAvatar(data.body.profile.avatar)
      setJobTitle(data.body.profile.job_title)
      setPin(data.body.pinned)
      let formatedDate = new Date(data.body.date)
      formatedDate = ((formatedDate.getMonth() > 8) ? (formatedDate.getMonth() + 1) : ('0' + (formatedDate.getMonth() + 1))) + '/' + ((formatedDate.getDate() > 9) ? formatedDate.getDate() : ('0' + formatedDate.getDate())) + '/' + formatedDate.getFullYear()
      setDate(formatedDate)
    })
  }

  const handlePind = async () => {
    await superagent.patch(`${API}/admin/posts/${id}`).set({ 'Authorization': `Basic ${context.token}` })
    getPost();
  }

  const handleDelete = async () => {
    await superagent.delete(`${API}/admin/posts/${id}`).set({ 'Authorization': `Basic ${context.token}` })
    history.push('/admin/community')
  }

  const Render = () => {
    return (
      <Container dangerouslySetInnerHTML={{ __html: body }}></Container>
    );
  }

  const Comments = () => {
    return comments.map((comm, index) => {
      return (
        <>
          <Card key={index} className='comment' style={{ marginTop: '15px' }}>
            <Card.Body style={{ paddingLeft: 0 }}>
              <Card.Title className='flexRow' >
                <Col className='flexRow' style={{ justifyContent: 'flex-start', width: '100%' }}>
                  <Col sm={2} style={{ padding: '0' }} >
                    <Image className='imgShadow' style={{ width: '40px', backgroundColor: 'transparent' }} src={comm.avatar} roundedCircle />
                  </Col>
                  <Col sm={10} style={{ justifyContent: 'flex-start' }} >
                    <h4 style={{ marginBottom: 0, fontSize: '14px', fontWeight: '600' }}>{comm.profile}</h4>
                    <p style={{ marginBottom: 0, fontSize: '12px' }}>{comm.job_title}</p>
                  </Col>
                </Col>
              </Card.Title>
              <Card.Text style={{ paddingLeft: '20px' }}>
                {comm.comment}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card key={index} className='comment' style={{ marginTop: '15px' }}>
            <Card.Body style={{ paddingLeft: 0 }}>
              <Card.Title className='flexRow' >
                <Col className='flexRow' style={{ justifyContent: 'flex-start', width: '100%' }}>
                  <Col sm={2} style={{ padding: '0' }} >
                    <Image className='imgShadow' style={{ width: '40px', backgroundColor: 'transparent' }} src={comm.avatar} roundedCircle />
                  </Col>
                  <Col sm={10} style={{ justifyContent: 'flex-start' }} >
                    <h4 style={{ marginBottom: 0, fontSize: '14px', fontWeight: '600' }}>{comm.profile}</h4>
                    <p style={{ marginBottom: 0, fontSize: '12px' }}>{comm.job_title}</p>
                  </Col>
                </Col>
              </Card.Title>
              <Card.Text style={{ paddingLeft: '20px' }}>
                {comm.comment}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card key={index} className='comment' style={{ marginTop: '15px' }}>
            <Card.Body style={{ paddingLeft: 0 }}>
              <Card.Title className='flexRow' >
                <Col className='flexRow' style={{ justifyContent: 'flex-start', width: '100%' }}>
                  <Col sm={2} style={{ padding: '0' }} >
                    <Image className='imgShadow' style={{ width: '40px', backgroundColor: 'transparent' }} src={comm.avatar} roundedCircle />
                  </Col>
                  <Col sm={10} style={{ justifyContent: 'flex-start' }} >
                    <h4 style={{ marginBottom: 0, fontSize: '14px', fontWeight: '600' }}>{comm.profile}</h4>
                    <p style={{ marginBottom: 0, fontSize: '12px' }}>{comm.job_title}</p>
                  </Col>
                </Col>
              </Card.Title>
              <Card.Text style={{ paddingLeft: '20px' }}>
                {comm.comment}
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      );
    })
  }

  const Post = () => {
    return (
      <>
        <Row className='flexRow' style={{ alignItems: 'flex-start' }}>
          <Col sm={7}>
            <Row  >
              <Col sm={12} >
                <Row style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                  <Col style={{ fontWeight: 'bold', fontSize: '22px' }}>
                    <If condition={pin !== 'false'}>
                      <BookmarkStarFill color='#232B4E' style={{ marginRight: '6px' }} size={22} />
                    </If>
                    {title}
                  </Col>
                  <Col>
                    <If condition={pin === 'false'}>
                      <Then>
                        <Button className='button12' style={{ width: '70px', maxWidth: '70px', marginRight: '3px' }} onClick={() => { handlePind() }}>Pin</Button>
                      </Then>
                      <Else>
                        <Button className='button12' style={{ width: '70px', maxWidth: '70px', marginRight: '3px' }} onClick={() => { handlePind() }}>Unpin</Button>
                      </Else>
                    </If>
                    <Button style={{ width: '70px', maxWidth: '70px', backgroundColor: '#B72525' }} onClick={() => { handleDelete() }}>Delete</Button>
                  </Col>
                </Row>

                <Col sm={12} className='flexRow' style={{ justifyContent: 'flex-start', padding: 0, marginTop: '30px' }}>
                  <Col style={{ padding: 0 }} sm={3} lg={2}>
                    <Image className='imgShadow' style={{ width: '72px' }} src={avatar} roundedCircle />
                  </Col>
                  <Col style={{ padding: 0 }}>
                    <h4 style={{ marginBottom: 0, fontSize: '20px', fontWeight: '600' }}>{name}</h4>
                    <p style={{ marginBottom: 0 }}>{jobTitle}</p>
                  </Col>
                  <Col style={{ textAlign: 'right' }}>
                    <p>{date}</p>
                  </Col>
                </Col>
              </Col>
            </Row>
            <Row className='flexCol' style={{ marginTop: '40px', marginBottom: '40px', justifyContent: 'center' }}>
              <Render />
            </Row>
          </Col>
          <Col sm={5}>

            <Row style={{ borderLeft: 'solid', height: '90%', borderRadius: '0px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
            </Row>
            <Row style={{ flexDirection: 'column' }}>
              <MDBContainer className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
                <Comments />
              </MDBContainer>
            </Row>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <Row style={{ width: '100%' }}>
      <Col sm={2}>
        <AdminHeader />

      </Col>
      <Col sm={10} style={{ marginTop: '30px' }}>
        <Container className='list-container post' style={{ width: '80%', backgroundColor: 'white' }}>
          <Post />
        </Container>
      </Col>
    </Row>
  )
}






