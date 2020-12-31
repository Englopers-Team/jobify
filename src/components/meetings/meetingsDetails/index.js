import React from 'react';
import { Row, Col } from 'react-bootstrap';


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
      </Row>
    </>
  )
}
export default Meetings;