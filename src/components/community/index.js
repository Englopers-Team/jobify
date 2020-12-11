import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/auth'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import superagent from 'superagent'
import './styles.scss'
import { PlusCircle, ChatSquareTextFill, HeartFill, BookmarkStarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'
import dotenv from 'dotenv';
import { If } from 'react-if'
dotenv.config();

export default function Community() {
  const [posts, setPosts] = useState([]);
  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com'
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
    // console.log(context.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token])

  const PostsList = () => {
    return posts.map((post) => {
      let date = new Date(post.date)
      const postPath = `/community/posts/${post._id}`
      date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
      return (
        <Container key={post._id} style={{ marginBottom: '30px' }}>
          <Row>
            <Col className='flexRow'>
              <Col sm={3} lg={2}>
                <Image className='imgShadow' style={{ width: '64px' }} src={post.profile.avatar} roundedCircle />
              </Col>
              <Col >
                <h4 style={{ marginBottom: 0, fontSize: '20px', fontWeight: '600' }}>{post.profile.name}</h4>
                <p style={{ marginBottom: 0 }}>{post.profile.job_title}</p>
              </Col>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <p>{date}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={7} style={{ marginLeft: '30px', marginTop: '15px', fontWeight: 'bold', color: '#232B4E' }}>
              <Row style={{ marginLeft: '5px' }}>
                <Link style={{ color: '#232B4E', fontWeight: 'bold' }} to={postPath}>{post.title}</Link>
              </Row>
              <Row style={{ marginLeft: '5px', marginTop: '8px' }}>
                <p style={{ marginBottom: 0 }}>
                  <If condition={post.pinned === 'true'}>
                    <BookmarkStarFill style={{ marginRight: '11px' }} size={18} />
                  </If>
                  <ChatSquareTextFill  size={18} />  {post.comments.length}  <HeartFill style={{ marginLeft: '5px' }} size={18} />  {post.likes.length}</p>
              </Row>
            </Col>
            {/* <Col style={{textAlign:'right',marginTop: '15px'}}>
            Comments: {post.comments.length}
            </Col>
            <Col style={{textAlign:'right',marginTop: '15px'}}>
            Likes: {post.likes.length}
            </Col> */}
          </Row>
          <hr />
        </Container >
      )
    })
  }

  return (
    <Container>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
          <h2 style={{ marginBottom: 0 }} >Discuss Your Problems With Our Community</h2>
        </Col>
        <Col style={{ textAlign: 'right', alignSelf: 'center' }}>
          <Link to='/community/submit'> <Button variant='outline-dark' className='buttonTopic' size="lg" type="submit" style={{ marginBottom: '50px', height: '40px', fontWeight: '500' }}>
            <PlusCircle style={{ paddingBottom: '2px' }} size={20} />  New Topic
          </Button></Link>
        </Col>
      </Row>
      <Row style={{ marginTop: '40px' }}>
        <PostsList />
      </Row>
    </Container>
  )
}