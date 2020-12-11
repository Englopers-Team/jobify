import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import { If, Then } from 'react-if';

import { useParams } from "react-router-dom";

export default function ReportDetails() {
  let { id } = useParams();

  const [data, setData] = useState();
  console.log(id)


  useEffect(() => {
    if(id){

      getData();
    }
  }, []);

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWNjb3VudF90eXBlIjoiYWRtaW4iLCJwcm9maWxlIjp7fSwiaWF0IjoxNjA3NzA4MDY2LCJleHAiOjM2MTYwNzcwODA2Nn0.uErZAP_4ZCFUp-WLXIhXlV7SZu40itfj0C6m1Ppwm_c';
    const response = await superagent.get(`${API}/admin/report/${id}`).set('authorization', `Basic ${token}`);
    console.log(response.body)
    setData(response.body);
  }

  return (
    <If>
      <h1>Hello</h1>
      {/* <h1>{data.sender.first_name}</h1> */}
    </If>
  )
}