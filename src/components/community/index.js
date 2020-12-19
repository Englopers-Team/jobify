import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import superagent from 'superagent';
import './styles.scss';
import { PlusCircle, ChatSquareTextFill, HeartFill, BookmarkStarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import dotenv from 'dotenv';
import { If, Then, Else } from 'react-if';
dotenv.config();

export default function Community() {
  const [posts, setPosts] = useState([]);
  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com';
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context.token) {
      getPosts();
    }
    // console.log(context.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token]);

  const getPosts = () => {
    superagent
      .get(`${API}/community`)
      .set({ Authorization: `Basic ${context.token}` })
      .then(async (data) => {
        setPosts([...data.body.pinned, ...data.body.personPost, ...data.body.communityPosts]);
      });
  };

  const handleLike = (id) => {
    superagent
      .patch(`${API}/community/like/${id}`)
      .set({ Authorization: `Basic ${context.token}` })
      .then(() => {
        getPosts();
      });
  };

  const PostsList = () => {
    return posts
      .slice(0)
      .reverse()
      .map((post) => {
        let date = new Date(post.date);
        const postPath = `/community/posts/${post._id}`;
        date = (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '/' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + '/' + date.getFullYear();
        return (
          <Container key={post._id} style={{ marginBottom: '30px' }} className='post-style'>
            <Link style={{ color: '#232B4E', fontWeight: 'bold' }} to={postPath}>
              <Row>
                <Col className='flexRow'>
                  <Col sm={3} lg={2}>
                    <Image className='imgShadow' style={{ width: '64px' }} src={post.profile.avatar} roundedCircle />
                  </Col>
                  <Col>
                    <h4 style={{ marginBottom: 0, fontSize: '20px', fontWeight: '600' }}>{post.profile.name}</h4>
                    <p style={{ marginBottom: 0 }}>{post.profile.job_title}</p>
                  </Col>
                </Col>
                <Col style={{ textAlign: 'right' }}>
                  <p>{date}</p>
                </Col>
              </Row>
            </Link>
            <Row>
              <Col sm={7} style={{ marginLeft: '30px', marginTop: '15px', fontWeight: 'bold', color: '#232B4E' }}>
                <Row style={{ marginLeft: '5px' }}>
                  <Link style={{ color: '#232B4E', fontWeight: 'bold' }} to={postPath}>
                    {post.title}
                  </Link>
                </Row>
                <Row style={{ marginLeft: '5px', marginTop: '8px' }}>
                  <p style={{ marginBottom: 0 }}>
                    <If condition={post.pinned === 'true'}>
                      <BookmarkStarFill color='#232B4E' style={{ marginRight: '11px', cursor: 'pointer' }} size={18} />
                    </If>
                    <If condition={post.likes.includes(context.user.id)}>
                      <Then>
                        <Link style={{ color: '#232B4E', fontWeight: 'bold' }} to={postPath}>
                          <ChatSquareTextFill color='#232B4E' size={18} style={{ cursor: 'pointer' }} /> {post.comments.length}
                        </Link>{' '}
                        <HeartFill onClick={() => handleLike(post._id)} color='red' style={{ marginLeft: '5px', cursor: 'pointer' }} size={18} /> {post.likes.length}
                      </Then>
                      <Else>
                        <Link style={{ color: '#232B4E', fontWeight: 'bold' }} to={postPath}>
                          <ChatSquareTextFill color='#232B4E' size={18} style={{ cursor: 'pointer' }} /> {post.comments.length}
                        </Link>{' '}
                        <HeartFill onClick={() => handleLike(post._id)} color='#232B4E' style={{ marginLeft: '5px', cursor: 'pointer' }} size={18} /> {post.likes.length}
                      </Else>
                    </If>
                  </p>
                </Row>
              </Col>
            </Row>
            <hr />
          </Container>
        );
      });
  };

  return (
    <Container>
      <Container style={{ width: '85%' }}>
        <Row style={{ justifyContent: 'space-between', marginRight: ' 0 !important' }}>
          <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
            <h2 style={{ marginBottom: 0 }}>Discuss Your Thoughts With Our Community</h2>
          </Col>
          <Col style={{ textAlign: 'right', alignSelf: 'center' }}>
            <Link to='/community/submit'>
              {' '}
              <Button variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginBottom: '50px', height: '40px', fontWeight: '500' }}>
                <PlusCircle style={{ paddingBottom: '2px' }} size={20} /> New Topic
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Row style={{ marginTop: '40px' }}>
        <PostsList />
      </Row>
    </Container>
  );
}
