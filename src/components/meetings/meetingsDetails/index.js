import React from 'react';
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
  const timeHourNow = new Date().toLocaleString().split(',');
  const date = timeHourNow[0].split('/');
  const hour = timeHourNow[1].slice(1, timeHourNow[1].length).split(' ')[0].split(':')[0];
  const AmPm = timeHourNow[1].slice(1, timeHourNow[1].length).split(' ')[1];

  return (
    <>
      {console.log('herep', props.myMeetings)}
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
      </Row>
      <Row style={{ flexDirection: 'column' }}>
        {
          props.myMeetings.map((item, index) => {
            let itemDate = item.date.split(',')[0].split('/');
            let itemTime = item.date.split(',')[1].split(' ')[0].split(':')[0];
            let itemAmPm = item.date.split(',')[1].split(' ')[1];
            // console.log(itemDate, itemTime, itemAmPm)
            // console.log(date, hour, AmPm)
            console.log('hhhhhh', date[2], itemDate[2])
            if ((itemDate[2] > date[2] || itemDate[2] === date[2] && itemDate[0] > date[0] || itemDate[2] === date[2] && itemDate[0] === date[0] && itemDate[1] >= date[1]) && (!(itemAmPm === 'AM' && AmPm === 'PM')) && (Number(itemTime) >= Number(hour) || Number(itemTime) === 12)) {
              return (
                <Col key={index}>{item.date} , {item.id}</Col>
              )
            }else {
              return (
                <Col style={{color : 'red'}} key={index}>{item.date} , {item.id}</Col>
              )
            }
          })
        }
      </Row>
    </>
  )
}
export default Meetings;


//   if (item.date === props.value.toLocaleString().split(',')[0]) {
//     return Object.keys(data[date]).map((meeting, index) => {
//       if (meeting.split(' ')[2] === new Date().toLocaleString().split(',')[1].split(' ')[2] && meeting.split(' ')[1] > new Date().toLocaleString().split(',')[1].split(' ')[1] && (Number(date.split('/')[2]) >= Number(new Date().toLocaleString().split(',')[0].split('/')[2]) && Number(date.split('/')[0]) >= Number(new Date().toLocaleString().split(',')[0].split('/')[0]) && Number(date.split('/')[1]) >= Number(new Date().toLocaleString().split(',')[0].split('/')[1]))) {
//         return (
//           <Col>{meeting} , {Object.values(data[date])[index]}</Col>
//         )
//       
//       }
//     })
//   }
// })