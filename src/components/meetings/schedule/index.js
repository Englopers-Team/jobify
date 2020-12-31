import React from 'react';
import Calendar from 'react-calendar';

import './schedule.scss';

function Schedule (props){
  return(
    <Calendar  className="react-calendar" onChange={props.onChange} value={props.value}/>
  )

}

export default Schedule;