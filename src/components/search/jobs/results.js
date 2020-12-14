/* eslint-disable no-unused-vars */
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useContext, useState } from 'react';
import { If, Then, Else } from 'react-if';
import superagent from 'superagent';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../../context/auth'


export default function JobsResults(props) {
  let results = props.results;
  const context = useContext(AuthContext)
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const Apply = (payload) => {
    const API = 'https://jobify-app-v2.herokuapp.com/user/apply';
    setLoader(true);
    superagent
      .post(`${API}/${payload.job_id}`)
      .set('authorization', `Basic ${context.token}`)
      .send(payload)
      .then(() => {
        setLoader(false);
        setShow(false);
      });
  };
  const save = (payload) => {
    const API = 'https://jobify-app-v2.herokuapp.com/user/save';
    setLoader(true);
    superagent
      .post(`${API}`)
      .set('authorization', `Basic ${context.token}`)
      .send(payload)
      .then((data) => {

        setLoader(false);
        setShow(false);
      });
  };
  return (
    <>
      <If condition={props.visable}>
        <Then>
          <Container className='list-container' fluid>
            <Row sm={8} className='flexRow list-header'>
              <Col style={{ color: '#717171', fontWeight: 550 }} className='col-title' sm={4}>
                Job Title
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                Company{' '}
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                Location
              </Col>
              <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                Type
              </Col>
              <If condition={props.loader}>
                <Col style={{ color: '#717171', fontWeight: 550 }} sm={2}>
                  <Spinner animation='border' variant='primary' />
                </Col>
              </If>
            </Row>

            {results.map((item, index) => {
              return (
                <Row key={index} className='flexRow list-body' sm={8}>
                  <Col style={{ fontWeight: 650 }} sm={4}>
                    {item.title}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.company_name}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.location}
                  </Col>
                  <Col style={{ textAlign: 'center', color: '#9393A1' }} sm={2}>
                    {item.type}
                  </Col>
                  <Col style={{ textAlign: 'center' }} className='button-col' sm={1}>
                    <If condition={item.job_id}>
                      <Then>
                        <Button
                          className='button'
                          style={{ paddingRight: '50px', backgroundColor: '#504edf' }}
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
                          style={{ paddingRight: '50px', backgroundColor: '#504edf' }}
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
                    <Button
                      className='button'
                      style={{ paddingRight: '50px', backgroundColor: '#504edf' }}
                      onClick={() => {
                        <If condition={item.job_id}>
                          <Then>
                            {Apply({
                              job_id: item.job_id,
                              company_id: item.company_id,
                            })}
                          </Then>
                          <Else>
                            {Apply({
                              title: item.title,
                              location: item.location,
                              type: item.type,
                              company_name: item.company_name,
                              logo: item.logo,
                              email: item.email,
                              job_id: 0,
                              api: true,
                            })}
                          </Else>
                        </If>;
                      }}
                      variant='praimary'
                    >
                      Apply
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Container>
        </Then>
      </If>
    </>
  );
}
