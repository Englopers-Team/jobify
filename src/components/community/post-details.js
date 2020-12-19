import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { Container, Row, Col, Form, Button, Image, Card } from 'react-bootstrap';
import superagent from 'superagent';
import { If, Then, Else } from 'react-if';
import { useParams, useHistory } from 'react-router-dom';
import './styles.scss';
import { PencilFill, XCircleFill } from 'react-bootstrap-icons';

export default function PostDetails() {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [name, setName] = useState('');
  const [writer, setWriter] = useState(0);
  let { id } = useParams();
  let myComment = '';

  const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com';
  const context = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (context.token) {
      getPost();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token]);

  const getPost = () => {
    superagent
      .get(`${API}/community/post/${id}`)
      .set({ Authorization: `Basic ${context.token}` })
      .then((data) => {
        setTitle(data.body.title);
        setBody(data.body.body);
        setName(`${data.body.profile.name}`);
        setAvatar(data.body.profile.avatar);
        setJobTitle(data.body.profile.job_title);
        setComments(data.body.comments);
        setWriter(data.body.auth_id);
        let formatedDate = new Date(data.body.date);
        formatedDate = (formatedDate.getMonth() > 8 ? formatedDate.getMonth() + 1 : '0' + (formatedDate.getMonth() + 1)) + '/' + (formatedDate.getDate() > 9 ? formatedDate.getDate() : '0' + formatedDate.getDate()) + '/' + formatedDate.getFullYear();
        setDate(formatedDate);
      });
  };

  const Render = () => {
    return <Container dangerouslySetInnerHTML={{ __html: body }}></Container>;
  };

  const handleDelete = (commentID) => {
    superagent
      .delete(`${API}/community/comment/${id}`)
      .set({ Authorization: `Basic ${context.token}` })
      .send({ commentID })
      .then(() => {
        getPost();
      });
  };

  const Comments = () => {
    return comments.map((comm, index) => {
      return (
        <Card key={index} className='comment'>
          <Card.Body style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            <Card.Title className='flexRow'>
              <Col sm={10} className='flexRow' style={{ justifyContent: 'flex-start', padding: 0, marginTop: '0px' }}>
                <Col style={{ padding: 0 }} sm={1} lg={1}>
                  <Image className='imgShadow' style={{ width: '32px', backgroundColor: 'transparent', objectFit: 'cover', height: 32 }} src={comm.avatar} roundedCircle />
                </Col>
                <Col sm={10} style={{ padding: 0, marginLeft: '25px' }}>
                  <h4 style={{ marginBottom: 0, fontSize: '14px', fontWeight: '600' }}>{comm.profile}</h4>
                  <p style={{ marginBottom: 0, fontSize: '12px' }}>{comm.job_title}</p>
                </Col>
              </Col>
              <If condition={comm.writerID === context.user.id}>
                <Then>
                  <Col style={{ textAlign: 'right' }}>
                    <XCircleFill onClick={() => handleDelete(index)} color='#232B4E' size={16} style={{ alignSelf: 'flex-start', cursor: 'pointer' }} />
                  </Col>
                </Then>
                <Else>
                  <Col></Col>
                </Else>
              </If>
            </Card.Title>
            <Card.Text>{comm.comment}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (myComment.length > 0) {
      superagent
        .post(`${API}/community/comment/${id}`)
        .set({ Authorization: `Basic ${context.token}` })
        .send({ comment: myComment })
        .then(() => {
          setComments([...comments, { writerID: context.user.id, comment: myComment, avatar: context.user.profile.avatar, job_title: context.user.profile.job_title, profile: `${context.user.profile.first} ${context.user.profile.last}` }]);
          myComment = '';
        });
    }
  };

  const handleChange = (e) => {
    myComment = e.target.value;
  };

  const handleEdit = () => {
    history.push(`/community/edit/${id}`);
  };
  const Post = () => {
    return (
      <>
        <Row className='flexRow' style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
          <Col sm={6} className='post-style-full'>
            <Row>
              <Col sm={12} style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
                {/* <Col sm={9} className='flexRow' style={{ justifyContent: 'flex-start', marginLeft: 0, paddingLeft: 0 }}> */}
                <h2 style={{ marginBottom: 0, marginRight: '10px' }}>
                  {title}
                  <If condition={writer === context.user.id}>
                    <PencilFill style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => handleEdit()} color='#232B4E' size={18} />
                  </If>
                </h2>
                {/* </Col> */}

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
          <Col sm={1}></Col>
          <Col sm={5} className='post-style-full2'>
            <Row style={{ borderLeft: 'solid', height: '90%', borderRadius: '0px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
              <h2>Comments</h2>
            </Row>
            <Row style={{ borderLeft: 'solid', height: '90%', borderRadius: '0px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
              <Col sm={12} className='flexRow' style={{ justifyContent: 'flex-start', padding: 0, marginTop: '10px' }}>
                <Col style={{ padding: 0, marginLeft: '10px', marginRight: '10px' }} sm={1} lg={1}>
                  <Image className='imgShadow' style={{ width: '32px', objectFit: 'cover', height: 32 }} src={context.user.profile.avatar} roundedCircle />
                </Col>
                <Col sm={8} style={{ padding: 0 }}>
                  <h4 style={{ marginBottom: 0, fontSize: '14px', fontWeight: '600' }}>
                    {context.user.profile.first} {context.user.profile.last}
                  </h4>
                  <p style={{ marginBottom: 0, fontSize: '12px' }}>{context.user.profile.job_title}</p>
                </Col>
              </Col>
            </Row>
            <Row className='flexRow' style={{ marginTop: '00px', marginBottom: '20px', borderLeft: 'solid', height: '90%', borderRadius: '0px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '0px' }}>
              <Form.Control required onChange={(event) => handleChange(event)} style={{ width: '80%', height: 40 }} className='input' type='text' placeholder='Say Something' />
              <Button onClick={(e) => handleSubmit(e)} variant='outline-dark' className='buttonTopic' size='sm' type='submit' style={{ marginTop: '0px', marginBottom: '4px', height: '40px', fontWeight: '500' }}>
                Submit
              </Button>
            </Row>
            <Row style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Comments />
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Container>
      <If condition={context.user.profile}>
        <Post />
      </If>
    </Container>
  );
}
