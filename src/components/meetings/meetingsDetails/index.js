import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

let data = {
  '11/29/2020': { '12:00:00 AM': 'omar', ' 5:00:00 PM': 'ali' },
  '12/28/2020': { '12:00:00 AM': 'omar', ' 5:00:00 PM': 'ali' },
  '12/30/2020': { '12:00:00 AM': 'abdallah', ' 1:00:00 PM': 'zatar' },
  '12/31/2020': { '12:00:00 AM': 'sara', ' 6:00:00 PM': 'rami' },
  '1/1/2021': { '12:00:00 AM': 'sara', ' 6:00:00 PM': 'rami' },
  '1/2/2021': { '12:00:00 AM': 'sara', ' 3:00:00 PM': 'rami' },
  '1/3/2021': { '12:00:00 AM': 'sara', ' 6:00:00 PM': 'rami' }
}



function Meetings(props) {
  const [columnName, setColumnName] = useState('')
  const timeHourNow = new Date().toLocaleString().split(',');
  const date = timeHourNow[0].split('/');
  const hour = timeHourNow[1].slice(1, timeHourNow[1].length).split(' ')[0].split(':')[0];
  const AmPm = timeHourNow[1].slice(1, timeHourNow[1].length).split(' ')[1];

  useEffect(() => {
    let column = 'auth_id_company'
    console.log('props.account_type', props.account_type)
    if (props.account_type === 'c') {
      column = 'auth_id_person';
    }
    setColumnName(column)
  }, [])

  return (
    <>
      {/* {console.log('meetings', props.myMeetings)}
      {console.log('userDeatails', props.userDeatails)} */}
      {console.log(props.account_type)}
      <Row >
        {Object.keys(props.userDeatails).map((id, index) => {
          if (id === props.yourID) {
            return null;
          }
          return (
            <button key={id} onClick={() => {
              props.setUserToCall(id)
              props.setShow(true)
            }}>Peer = {id} -- ID = {Object.values(props.userDeatails)[index]}</button>
          );
        })}
      </Row>
      <Row style={{ flexDirection: 'column' }}>
        {console.log(props.myMeetings)}
        {
          props.myMeetings.map((item, index) => {
            if (item.date.length < 19) {
              return <p>Wrong date</p>
            }
            let itemDate = item.date.split(',')[0].split('/');
            let itemTime = item.date.split(',')[1].split(' ')[0].split(':')[0];
            let itemAmPm = item.date.split(',')[1].split(' ')[1];
            // console.log(itemDate, itemTime, itemAmPm)
            // console.log(date, hour, AmPm)
            if ((itemDate[2] > date[2] || itemDate[2] === date[2] && itemDate[0] > date[0] || itemDate[2] === date[2] && itemDate[0] === date[0] && itemDate[1] >= date[1]) && (!(itemAmPm === 'AM' && AmPm === 'PM')) && (Number(itemTime) >= Number(hour) || Number(itemTime) === 12)) {
              console.log('check', item[columnName], Object.values(props.userDeatails))
              if (Object.values(props.userDeatails).includes(item[columnName])) {

                return (
                  <Col key={index}>{item.date} , {item.id} , ONLINE</Col>
                )
              } else {
                return (
                  <Col key={index}>{item.date} , {item.id} , OFFLINE</Col>
                )
              }
            } else {
              console.log('check', item[columnName], Object.values(props.userDeatails))
              if (Object.values(props.userDeatails).includes(item[columnName])) {
                return (
                  <Col style={{ color: 'red' }} key={index}>{item.date} , {item.id} , ONLINE</Col>
                )
              } else {
                return (
                  <Col style={{ color: 'red' }} key={index}>{item.date} , {item.id} , OFFLINE</Col>
                )
              }

            }
          })
        }
      </Row>
    </>
  )
}
export default Meetings;

