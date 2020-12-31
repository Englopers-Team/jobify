import React from 'react';
import { Row, Col } from 'react-bootstrap';

let data = {
  '11/29/2020': { '12:00:00 AM': 'omar', ' 5:00:00 PM': 'ali' },
  '12/30/2020': { '12:00:00 AM': 'abdallah', ' 1:00:00 PM': 'zatar' },
  '12/31/2020': { '12:00:00 AM': 'khaled', ' 6:00:00 PM': 'rami' },
  '1/1/2021': { '12:00:00 AM': 'khaled', ' 6:00:00 PM': 'rami' }
}

function Meetings(props) {
  return (
    <>
      <Row >
        {Object.keys(props.users).map(id => {
          if (id === props.yourID) {
            return null;
          }
          return (
            <button key={id} onClick={() => {
              props.setUserToCall(id)
              props.setShow(true)
            }}>Call {id}</button>
          );
        })}
      </Row> <Row style={{ flexDirection: 'column' }}>
        {
          Object.keys(data).map(date => {
            if (date === props.value.toLocaleString().split(',')[0]) {
              return Object.keys(data[date]).map((meeting, index) => {
                if (meeting.split(' ')[2] === new Date().toLocaleString().split(',')[1].split(' ')[2] && meeting.split(' ')[1] > new Date().toLocaleString().split(',')[1].split(' ')[1] && (Number(date.split('/')[2]) >= Number(new Date().toLocaleString().split(',')[0].split('/')[2]) && Number(date.split('/')[0]) >= Number(new Date().toLocaleString().split(',')[0].split('/')[0]) && Number(date.split('/')[1]) >= Number(new Date().toLocaleString().split(',')[0].split('/')[1]))) {
                  return (
                    <Col>{meeting} , {Object.values(data[date])[index]}</Col>
                  )
                } else {
                  return (
                    <Col style={{ color: 'red' }}>{meeting} , {Object.values(data[date])[index]}</Col>
                  )
                }
              })
            }
          })
        }
      </Row>
    </>
  )
}
export default Meetings;