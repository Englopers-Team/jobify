import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import superagent from 'superagent';
import { If, Then } from 'react-if';

export default function AdminDashboard() {
  const [data, setData] = useState();

  const color = [
    'rgba(255, 99, 132, 0.85)',
    'rgba(54, 162, 235, 0.85)',
    'rgba(255, 206, 86, 0.85)',
    'rgba(75, 192, 192, 0.85)',
    'rgba(153, 102, 255, 0.85)',
    'rgba(255, 159, 64, 0.85)'
  ]
  const borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ]

  function chartHandler(title, data, labels) {
    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Total user ${title}`,
          data: data,
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: 2,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              lineHeight: 10,
              display: false
            }
          }]
        }
      }
    }
  }

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWNjb3VudF90eXBlIjoiYWRtaW4iLCJwcm9maWxlIjp7fSwiaWF0IjoxNjA3NjEzOTUwLCJleHAiOjM2MTYwNzYxMzk1MH0.cV-8lRQZKQbI_-4V8TujDoE5n0oMrXixx223HCyRIH4';
    const response = await superagent.get(`${API}/admin`).set('authorization', `Basic ${token}`);
    setData(response.body);
    console.log(response.body)
  }

  useEffect(() => {
    let appUser = document.getElementById('appUser').getContext('2d');
    if (data) {
      new Chart(appUser, chartHandler(data.totalUser, [data.numCompany, data.numPerson], ['Companies', 'Applicant']));
    } else {
      getData()
    }
  }, [data]);

  return (
    <>
      <canvas id="appUser" width="200" height="200"></canvas>
      {console.log('1')}
    </>
  )
}