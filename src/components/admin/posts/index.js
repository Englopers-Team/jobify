import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../context/auth'
import { Container, Row, Col, Dropdown, FormControl, Image, FormCheck, FormLabel } from 'react-bootstrap';
import superagent from 'superagent'
import { Link } from 'react-router-dom'
import dotenv from 'dotenv';
import { If, Then, Else } from 'react-if'
import { PlusCircle, ChatSquareTextFill, HeartFill, BookmarkStarFill, Search } from 'react-bootstrap-icons';

import { MDBContainer } from "mdbreact";

import './styles.scss';
dotenv.config();



export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [sortSearch, setSortSearch] = useState('');
  const [sortSearchType, setSortSearchType] = useState('Post ID');
  const [dateSearch, setDateSearch] = useState('');
  const [sortInteractiveLike, setSortInteractiveLike] = useState(false);
  const [sortInteractiveComment, setSortInteractiveComment] = useState(false);
  const [countSeacr, setCountSearch] = useState(0)
  const [pinned, setPinned] = useState('*')

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
      setPosts([...data.body.pinned, ...data.body.communityPosts])
    })
  }


  function PostsList() {
    let tempPosts = [...posts]
    if (sortInteractiveLike) {
      tempPosts.sort((a, b) => b.likes.length - a.likes.length);
    }
    if (sortInteractiveComment) {
      tempPosts.sort((a, b) => b.comments.length - a.comments.length);
    }
    let count = 0;
    let num = 0
    setCountSearch(count)
    return tempPosts.map((item, index) => {
      num++;
      let date = new Date(item.date)
      date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear()

      if (sortSearch === '' && dateSearch === '' || sortSearchType === 'Post ID' && sortSearch == 0 || sortSearchType === 'Post ID' && sortSearch == index || sortSearchType === 'Username' && item.profile.name.toLowerCase().includes(sortSearch.toLowerCase()) || sortSearchType === 'Post Title' && item.title.toLowerCase().includes(sortSearch.toLowerCase()) || sortSearchType === 'date' && date.split('-').reverse()[0] === dateSearch.split('-')[0] && date.split('-').reverse()[1] === dateSearch.split('-')[1] && date.split('-').reverse()[2] === dateSearch.split('-')[2]) {
        if (item.pinned === pinned || pinned === '*') {
          count += 1;
          setCountSearch(count)
          return (
            <Link style={{ textDecoration: 'none' }} id='link' to={{ pathname: `/admin/posts/${item._id}` }}>
              <Row id='postInfoLink' className='flexRow list-body' sm={8}>
                <Col style={{ fontWeight: 650, textAlign: 'start', color: '#9393A1' }} sm={1}>
                  {num}
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
                  <HeartFill style={{ marginRight: '6px' }} size={18} /><span style={{ marginRight: '6px' }}>{item.likes.length}</span>
                  <ChatSquareTextFill style={{ marginLeft: '6px' }} size={18} />  <span style={{ marginLeft: '6px' }}>{item.comments.length}</span>
                  <If condition={item.pinned === 'true'}>
                    <BookmarkStarFill style={{ marginLeft: '6px' }} size={18} />
                  </If>
                </Col>
                <Col style={{ color: '#9393A1' }} sm={2}>
                  {date}
                </Col>
              </Row>

            </Link>
          );
        }
      }
    })
  }




  return (
    <Container style={{ display: 'flex', flexDirection: 'row' }}>
      <Col sm={9} className='list-container' style={{ width: '100%' }}>
        <MDBContainer className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
          <PostsList />
        </MDBContainer>
      </Col>

      <Col className='list-container' style={{ textAlign: 'center', backgroundColor: '#232B4E', color: '#E1E3E8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} sm={3} >
        <Row style={{ height: '15%', fontWeight: 'bold', marginTop: '10px' }}>
          <Col style={{ fontSize: '20px' }}>
            Total Result : {countSeacr}
          </Col>
        </Row>
        <Row style={{ height: '38%' }} >
          <Col>
            <Dropdown  >
              <Dropdown.Toggle style={{ backgroundColor: '#E1E3E8', width: '190px' }} variant="Info" id="dropdown-basic">
                Search By {sortSearchType}
              </Dropdown.Toggle>
              <Dropdown.Menu  >
                <Dropdown.Item style={{ backgroundColor: '#E1E3E8', marginBottom: '2px', width: '172px' }} onClick={() => { setSortSearchType('Post ID') }}>Post ID</Dropdown.Item>
                <Dropdown.Item style={{ backgroundColor: '#E1E3E8', marginBottom: '2px' }} onClick={() => { setSortSearchType('Username') }}>Username</Dropdown.Item>
                <Dropdown.Item style={{ backgroundColor: '#E1E3E8', marginBottom: '2px' }} onClick={() => { setSortSearchType('Post Title') }}>Post Title</Dropdown.Item>
                <Dropdown.Item style={{ backgroundColor: '#E1E3E8', marginBottom: '2px' }} onClick={() => { setSortSearchType('date') }}>Date</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown >
          </Col>
        </Row>
        <Row style={{ height: '10%' }}>
          <Col>
            <If condition={sortSearchType !== 'date'}>
              <Then>
                <FormControl style={{ backgroundColor: '#E1E3E8' }} placeholder={`Search By ${sortSearchType}`} onChange={(e) => { setSortSearch(e.target.value) }} />
              </Then>
              <Else>
                <FormControl style={{ backgroundColor: '#E1E3E8' }} type="date" name="dob" placeholder={`Search By ${sortSearchType}`} onChange={(e) => { setDateSearch(e.target.value); }} />
              </Else>
            </If>
          </Col>
        </Row >
        <Row  >
          <Col style={{ textAlign: 'start' }}>
            <FormCheck type="radio" name="formHorizontalRadios" id="custom-switch" label="Most Like" onChange={(e) => { setSortInteractiveLike(sortInteractiveLike ? false : true) }} />
          </Col>
        </Row>
        <Row >
          <Col style={{ textAlign: 'start' }}>
            <FormCheck type="radio" name="formHorizontalRadios" id="custom-switch" label="Most Comment" onChange={(e) => { setSortInteractiveComment(sortInteractiveComment ? false : true) }} />
          </Col>
        </Row>
        <Row style={{ height: '10%', textAlign: 'start' }}>
          <Col>
            <FormCheck type="switch" name="formHorizontalSwitch" id="custom" label="Pinned Post" onChange={(e) => { setPinned(pinned === '*' ? 'true' : '*') }} />
          </Col>
        </Row>
        <Row style={{ height: '27%' }}>
        </Row>
      </Col>
    </Container>
  )
}