import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

import { AuthContext } from '../../../context/auth';

import { CircleFill } from 'react-bootstrap-icons';



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

  const context = useContext(AuthContext);

  useEffect(() => {
    let column = 'auth_id_person'
    if (context.user.account_type === 'p') {
      column = 'auth_id_company';
    }
    setColumnName(column)
  }, [context.user.account_type])

  useEffect(() => {

  }, [])

  return (
    <>

      {/* <Row >
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
      </Row> */}
      <Row style={{ flexDirection: 'column' }}>
        {
          props.myMeetings.map((item, index) => {
            if (item.date.length < 19) {
              return <></>
            }
            let itemDate = item.date.split(',')[0].split('/');
            let itemTime = item.date.split(',')[1].split(' ')[0].split(':')[0];
            let itemAmPm = item.date.split(',')[1].split(' ')[1];
            if ((itemDate[2] > date[2] || itemDate[2] === date[2] && itemDate[0] > date[0] || itemDate[2] === date[2] && itemDate[0] === date[0] && itemDate[1] >= date[1]) && (!(itemAmPm === 'AM' && AmPm === 'PM')) && (Number(itemTime) >= Number(hour) || Number(itemTime) === 12)) {
              if (Object.values(props.userDeatails).includes(item[columnName])) {
                let id;
                Object.values(props.userDeatails).forEach((item2, index2) => {
                  if (item2 === item[columnName]) {
                    Object.keys(props.userDeatails).forEach((item3, index3) => {
                      if (index2 === index3) {
                        id = item3
                        console.log(id)
                      }
                    })
                  }
                })

                return (
                  <>
                    <Col style={{ display: 'flex', alignItems: 'center', height: '50px', marginBottom: '30px',cursor:'pointer' }} onClick={() => {
                      props.setUserToCall(id)
                      props.setShow(true)
                    }} key={index}>
                      <Col sm={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <img style={{ width: '25px', borderRadius: '50%' }} src={`${item.avatar}`} />
                        <p style={{ margin: 0, marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}>{item.first_name}</p>
                      </Col>
                      <Col sm={4} style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold' }}>
                        {itemTime}:00 {itemAmPm}
                      </Col>
                      <Col style={2} style={{ textAlign: 'right', margin: 'auto' }}><CircleFill style={{ marginBottom: '5px' }} color='green' /></Col>

                    </Col>
                    <hr style={{ marginTop: 0, width: '80%', alignSelf: 'center' }}></hr>
                  </>
                )
              } else {
                return (
                  <>
                    <Col style={{ display: 'flex', alignItems: 'center', height: '50px', marginBottom: '30px' }} key={index}>
                      <Col sm={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <img style={{ width: '25px', borderRadius: '50%' }} src={`${item.avatar}`} />
                        <p style={{ margin: 0, marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}>{item.first_name}</p>
                      </Col>
                      <Col sm={4} style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold' }}>
                        {itemTime}:00 {itemAmPm}
                      </Col>
                      <Col style={2} style={{ textAlign: 'right', margin: 'auto' }}><CircleFill style={{ marginBottom: '5px' }} color='#BABACC' /></Col>

                    </Col>
                    <hr style={{ marginTop: 0, width: '80%', alignSelf: 'center' }}></hr>
                  </>
                )
              }
            } else {
              if (Object.values(props.userDeatails).includes(item[columnName])) {
                return (
                  <>
                    <Col style={{ display: 'flex', alignItems: 'center', height: '50px', marginBottom: '30px' }} key={index}>
                      <Col sm={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <img style={{ width: '25px', borderRadius: '50%' }} src={`${item.avatar}`} />
                        <p style={{ margin: 0, marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}>{item.first_name}</p>
                      </Col>
                      <Col sm={4} style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold', color: 'red' }}>
                        {itemTime}:00 {itemAmPm}
                      </Col>
                      <Col style={2} style={{ textAlign: 'right', margin: 'auto' }}><CircleFill style={{ marginBottom: '5px' }} color='green' /></Col>

                    </Col>
                    <hr style={{ marginTop: 0, width: '80%', alignSelf: 'center' }}></hr>
                  </>
                )
              } else {
                return (
                  <>
                    <Col style={{ display: 'flex', alignItems: 'center', height: '50px', marginBottom: '30px' }} key={index}>
                      <Col sm={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <img style={{ width: '25px', borderRadius: '50%' }} src={`${item.avatar}`} />
                        <p style={{ margin: 0, marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}>{item.first_name}</p>
                      </Col>
                      <Col sm={4} style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold', color: 'red' }}>
                        {itemTime}:00 {itemAmPm}
                      </Col>
                      <Col style={2} style={{ textAlign: 'right', margin: 'auto' }}><CircleFill style={{ marginBottom: '5px' }} color='#BABACC' /></Col>

                    </Col>
                    <hr style={{ marginTop: 0, width: '80%', alignSelf: 'center' }}></hr>
                  </>

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

