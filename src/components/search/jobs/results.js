/* eslint-disable no-unused-vars */
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useContext, useState, useEffect } from 'react';
import { If, Then, Else } from 'react-if';
import superagent from 'superagent';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../../context/auth';
import { useHistory } from 'react-router-dom';

export default function JobsResults(props) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  let history = useHistory();

  let results = props.results;
  const context = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const Apply = (payload) => {
    console.log(payload);
    if (context.token) {
      const API = 'https://jobify-app-v2.herokuapp.com/user/apply';
      setLoader(true);
      superagent
        .post(`${API}/${payload.job_id}`)
        .set('authorization', `Basic ${context.token}`)
        .send(payload)
        .then((data) => {
          console.log(data.body);
          setLoader(false);
          setShow(false);
          history.push('/applicant/applications');
        });
    } else history.push('/signup');
  };
  const save = (payload) => {
    if (context.token) {
      const API = 'https://jobify-app-v2.herokuapp.com/user/save';
      setLoader(true);
      superagent
        .post(`${API}`)
        .set('authorization', `Basic ${context.token}`)
        .send(payload)
        .then((data) => {
          setLoader(false);
          setShow(false);
          history.push('/applicant/saved-jobs');
        });
    } else history.push('/signup');
  };

  const checkSize = () => {
    setScreenSize(window.screen.width);
  };

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    if (context.token) {
    }
    return () => {
      window.removeEventListener('resize', checkSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize, context.token]);
  return (
    <>
      <If condition={props.visable}>
        <Then>
          <If condition={results[0]}>
            <Then>
              <Container className='list-container' fluid>
                <Row sm={8} className='flexRow list-header' style={{ height: screenSize > '575' ? '80px' : '130px' }}>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} className='col-title ' sm={4}>
                    Job Title
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={2}>
                    Company
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={2}>
                    Location
                  </Col>
                  <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} sm={2}>
                    Type
                  </Col>
                  <If condition={props.loader}>
                    <Col style={{ color: '#515151', fontWeight: 660 }} sm={2}>
                      <Spinner animation='border' variant='primary' />
                    </Col>
                  </If>
                </Row>

                {results.map((item, index) => {
                  return (
                    <Row key={index} className='flexRow list-body' sm={8}>
                      <Col style={{ textAlign: 'center', verticalAlign: 'center', color: '#515151' }} sm={4}>
                        {item.title}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                        {item.company_name}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                        {item.location}
                      </Col>
                      <Col style={{ textAlign: 'center', color: '#515151' }} sm={2}>
                        {item.type}
                      </Col>
                      <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                        <If condition={item.job_id}>
                          <Then>
                            <Button
                              className='button'
                              style={{ paddingRight: '50px', backgroundColor: '#504edf', width: screenSize > '575' ? 'fit-content' : '', padding: screenSize > '575' ? '150px' : '' }}
                              onClick={() => {
                                save({
                                  job_id: item.job_id,
                                  company_id: item.company_id,
                                });
                              }}
                            >
                              Save
                            </Button>
                          </Then>
                          <Else>
                            <Button
                              className='button'
                              style={{ backgroundColor: '#504edf', textAlign: 'center', width: screenSize > '575' ? 'fit-content' : '', padding: screenSize > '575' ? '5px 12px' : '' }}
                              onClick={() => {
                                save({
                                  title: item.title,
                                  location: item.location,
                                  type: item.type,
                                  description: item.description,
                                  company_name: item.company_name,
                                  phone: item.phone,
                                  company_url: item.company_url,
                                  logo: item.logo,
                                  country: item.country,
                                  job_id: 0,
                                  api: true,
                                });
                              }}
                              variant='praimary'
                            >
                              Save
                            </Button>
                          </Else>
                        </If>
                      </Col>
                      <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                        <If condition={item.id}>
                          <Then>
                            <Button
                              className='button'
                              style={{ backgroundColor: '#504edf', textAlign: 'center', width: screenSize > '575' ? 'fit-content' : '' }}
                              onClick={() => {
                                Apply({
                                  job_id: item.id,
                                  company_id: item.company_id,
                                });
                              }}
                              variant='praimary'
                            >
                              Apply
                            </Button>
                          </Then>
                          <Else>
                            <Button
                              className='button'
                              style={{ backgroundColor: '#504edf', textAlign: 'center', width: screenSize > '575' ? 'fit-content' : '' }}
                              onClick={() =>
                                Apply({
                                  title: item.title,
                                  location: item.location,
                                  type: item.type,
                                  company_name: item.company_name,
                                  logo: item.logo,
                                  email: item.email,
                                  job_id: '0',
                                  api: true,
                                })
                              }
                              variant='praimary'
                            >
                              Apply
                            </Button>
                          </Else>
                        </If>
                      </Col>
                    </Row>
                  );
                })}
              </Container>
            </Then>
            <Else>
              <Container style={{ justifyContent: 'center', marginTop: '30px' }}>
                <Col sm={12} style={{ color: '#717171', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>
                  NO RESULTS
                </Col>
              </Container>
            </Else>
          </If>
        </Then>
      </If>
    </>
  );
}
