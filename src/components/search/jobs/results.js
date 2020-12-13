import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useContext, useState, useEffect } from 'react';
import { If, Then, Else } from 'react-if';
import superagent from 'superagent';
import Button from 'react-bootstrap/Button';
export default function JobsResults(props) {
  let results = props.results;
  const [show, setShow] = useState(false);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudF90eXBlIjoicCIsInByb2ZpbGUiOnsiaWQiOjEsImZpcnN0IjoiTWFsZWsiLCJsYXN0IjoiQWhtZWQiLCJhdmF0YXIiOiJodHRwczovL2xpYnJhcnkua2lzc2NsaXBhcnQuY29tLzIwMTgwOTI5L29vcS9raXNzY2xpcGFydC1hdmF0YXItcGVyc29uLWNsaXBhcnQtYXZhdGFyLWNvbXB1dGVyLWljb25zLXBlcnNvbi04NzM1NWM1NmExNzQ4NDczLmpwZyIsImNvdW50cnkiOiJVU0EifSwiaWF0IjoxNjA3NjkzMzMxLCJleHAiOjM2MTYwNzY5MzMzMX0.UjxBO5cHePzHJaJcuZgQb-zZ1B_-XAFJYxfsKuUB_ig';
  const [loader, setLoader] = useState(false);
  const Apply = (payload) => {
    const API = 'https://jobify-app-v2.herokuapp.com/user/apply';
    setLoader(true);
    superagent
      .post(`${API}/${payload.job_id}`)
      .set('authorization', `Basic ${token}`)
      .send(payload)
      .then((data) => {
        console.log(data.text);

        setLoader(false);
        setShow(false);
      });
  };
  const save = (payload) => {
    const API = 'https://jobify-app-v2.herokuapp.com/user/save';
    setLoader(true);
    superagent
      .post(`${API}/${payload.job_id}`)
      .set('authorization', `Basic ${token}`)
      .send(payload)
      .then((data) => {
        console.log(data.text);

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

            {results.map((item) => {
              return (
                <Row className='flexRow list-body' sm={8}>
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
                    <Button
                      className='button'
                      style={{ paddingRight: '50px', backgroundColor: '#504edf' }}
                      onClick={() => {
                        <If condition={item.job_id}>
                          <Then>
                            {save({
                              job_id: item.job_id,
                              company_id: item.company_id,
                            })}
                          </Then>
                          <Else>
                            {save({
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
                            })}
                          </Else>
                        </If>;
                      }}
                      variant='praimary'
                    >
                      Save
                    </Button>
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
