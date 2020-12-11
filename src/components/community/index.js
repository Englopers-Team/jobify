import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/auth'
import { Container, Row, Col, Card, Image, Form, Button, Alert } from 'react-bootstrap';
import superagent from 'superagent'
import './styles.scss'


export default function Community() {
  const [posts, setPosts] = useState([]);
  const API = process.env.API_SERVER || 'http://localhost:4000'
  const context = useContext(AuthContext)

  useEffect(() => {
    const getPosts = () => {
      superagent.get(`${API}/community`).set({ 'Authorization': `Basic ${context.token}` }).then(async (data) => {
        setPosts([...data.body.pinned, ...data.body.personPost, ...data.body.communityPosts])
      })
    }
    if (context.token) {
      getPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const post = () => {
    return posts.map((post) => {
      return (
        <></>
      )
    })
  }

  return (
    <Container>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col style={{ borderLeft: 'solid', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
          <h2 >Discuss Your Problems With Our Community</h2>
        </Col>
        <Col>
          <Button variant='outline-dark' className='buttonTopic' size="lg" type="submit" style={{ marginBottom: '50px', height: '40px', fontWeight: '500' }}>
            New Topic
          </Button>
        </Col>
      </Row>
      <Row>

      </Row>
    </Container>
  )
}