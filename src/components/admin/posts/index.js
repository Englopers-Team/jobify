import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../context/auth'
import { Container, Row, Col, Dropdown, FormControl, Image, FormCheck, FormLabel } from 'react-bootstrap';
import superagent from 'superagent'
import { Link } from 'react-router-dom'
import dotenv from 'dotenv';
import { If, Then, Else } from 'react-if'
import { PlusCircle, ChatSquareTextFill, HeartFill, BookmarkStarFill, Search } from 'react-bootstrap-icons';

import { MDBContainer } from "mdbreact";
dotenv.config();



export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [sortSearch, setSortSearch] = useState('');
  const [sortSearchType, setSortSearchType] = useState('Post ID');
  const [date, setDate] = useState('');

  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com'
  const context = useContext(AuthContext)
  const scrollContainerStyle = { width: "auto", maxHeight: "500px", height: '500px', overflowY: 'scroll', overflowX: 'hidden' };

  useEffect(() => {
    context.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWNjb3VudF90eXBlIjoiYWRtaW4iLCJwcm9maWxlIjp7fSwiaWF0IjoxNjA3Nzk0NjA4LCJleHAiOjM2MTYwNzc5NDYwOH0.5HvXYp1M7afaUyAoYeWyqbuWjv9Og4RSpLHqOtu92p4'
    if (context.token) {
      getPosts()
    }
  }, [context.token])

  const getPosts = () => {
    superagent.get(`${API}/admin/posts`).set({ 'Authorization': `Basic ${context.token}` }).then(async (data) => {
      setPosts([...data.body.communityPosts])
    })
  }


  function PostsList() {


    return posts.map((item, index) => {
      let date = new Date(item.date)
      date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()

      if (sortSearch === '' || sortSearchType === 'Post ID' && sortSearch == index || sortSearchType === 'Username' && item.profile.name.toLowerCase().includes(sortSearch.toLowerCase())) {
        return (
          <Link style={{ textDecoration: 'none' }} id='link' to={{ pathname: `/admin/posts/${item.id}` }}>
            <Row className='flexRow list-body' sm={8}>
              <Col style={{ fontWeight: 650, textAlign: 'start', color: '#9393A1' }} sm={1}>
                {index}
              </Col>
              <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={1}>
                <Image src={`${item.profile.avatar}`} roundedCircle style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              </Col>
              <Col style={{ textAlign: 'start', color: '#9393A1', flexDirection: 'column' }} sm={3}>
                <p style={{ margin: '0px', fontWeight: 'bold' }}>
                  {item.profile.name}
                </p>
                <p style={{ margin: '0px' }}>
                  {item.profile.job_title}
                </p>
              </Col>
              <Col style={{ textAlign: 'start', color: '#9393A1', flexDirection: 'column' }} sm={5}>
                <p>{item.title}</p>
                <HeartFill style={{ marginRight: '6px' }} size={18} /><span style={{ marginRight: '6px' }}>{item.comments.length}</span>
                <ChatSquareTextFill style={{ marginLeft: '6px' }} size={18} />  <span style={{ marginLeft: '6px' }}>{item.likes.length}</span>
              </Col>
              <Col style={{ color: '#9393A1' }} sm={2}>
                {date}
              </Col>
            </Row>

          </Link>
        );
      }
    })
  }




  return (
    <Container style={{ display: 'flex', flexDirection: 'row' }}>
      <Col sm={10} className='list-container' style={{ width: '100%' }}>
        <MDBContainer className="scrollbar scrollbar-white  mt-5 mx-auto" style={scrollContainerStyle}>
          <PostsList />
        </MDBContainer>
      </Col>

      <Col sm={2} >
        <Row   >
          <Row>
            <Col>
              <FormCheck type="switch" id="custom-switch" label="Sort By Most Interactive" />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormLabel>Select Date</FormLabel>
              <FormControl type="date" name="dob" placeholder="Date of Birth" />
            </Col>
          </Row>
          <Col>
            <FormControl placeholder='Search' onChange={(e) => { setSortSearch(e.target.value) }} />
          </Col>
          <Col >
            <Dropdown>
              <Dropdown.Toggle variant="Info" id="dropdown-basic">
                Search By {sortSearchType}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { setSortSearchType('Post ID') }}>Post ID</Dropdown.Item>
                <Dropdown.Item onClick={() => { setSortSearchType('Username') }}>Username</Dropdown.Item>
                <Dropdown.Item onClick={() => { setSortSearchType('Post Title') }}>Post Title</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </Container>
  )
}