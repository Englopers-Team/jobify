import React, { useState, useEffect, useContext } from 'react';
import Chart from 'chart.js';
import superagent from 'superagent';
import { MDBContainer } from "mdbreact";
import AdminHeader from '../header/admin';
import './styles.scss';
import { Row, Col, Container } from 'react-bootstrap';
import { AuthContext } from '../../context/auth'


export default function AdminDashboard() {
  const [data, setData] = useState();
  const [avgAge, setAvgAge] = useState();
  const [errHand, setErrHand] = useState(true)

  const [topCountryPerson, setTopCountryPerson] = useState([]);
  const [topCountryComapny, setTopCountryComapny] = useState([]);

  const context = useContext(AuthContext)
  Chart.defaults.global.defaultFontSize = 14;
  Chart.defaults.global.defaultFontColor = 'black';
  Chart.defaults.global.defaultFontStyle = 'bold';



  const color = [
    '#504EDF',
    '#232B4E',
    '#006666',
    '#0000b3',
    '#8080ff',
    '#5c5c8a',
    '#6600ff'
  ]
  const borderColor = [
    '#504EDF',
    '#232B4E',
    '#006666',
    '#0000b3',
    '#8080ff',
    '#5c5c8a',
    '#6600ff'
  ]

  function chartBarHandler(title, data, labels) {
    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: 3,
        }]
      },
      options: {
        legend: {
          labels: {
            boxWidth: 0,
            family: "Georgia"
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              lineHeight: 2,
              display: false
            }
          }]
        }
      }
    }
  }

  function chartDoughnutHandler(title, data, labels) {
    return {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: 3,
        }]
      },
      options: {
        rotation: (0.5 * Math.PI) - (25 / 180 * Math.PI),
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              lineHeight: 2,
              display: false
            }
          }]
        }
      }
    }
  }

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const response = await superagent.get(`${API}/admin`).set('authorization', `Basic ${context.token}`);
    setData(response.body);
  }

  useEffect(() => {
    if (data && !errHand) {
      setAvgAge(data.avgAge);
      setTopCountryPerson(data.numberPersonEachCountry);
      setTopCountryComapny(data.numberCompanyEachCountry);

      let appUser = document.getElementById('appUser').getContext('2d');
      let appReports = document.getElementById('appReports').getContext('2d');
      let appReportsOpenClose = document.getElementById('appReportsOpenClose').getContext('2d');
      let jobs = document.getElementById('jobs').getContext('2d');
      let statusApps = document.getElementById('statusApps').getContext('2d');
      let statusOffer = document.getElementById('statusOffer').getContext('2d');
      let offerJob = document.getElementById('offerJob').getContext('2d');
      let appOfferJob = document.getElementById('appOfferJob').getContext('2d');
      let dbApiRatio = document.getElementById('dbApiRatio').getContext('2d');
      let topComponiesSendApp = document.getElementById('topComponiesSendApp').getContext('2d');
      let topComponiesSendOffer = document.getElementById('topComponiesSendOffer').getContext('2d');
      let topJobTitle = document.getElementById('topJobTitle').getContext('2d');


      new Chart(appUser, chartBarHandler(`Total Users ${data.totalUser}`, [data.numCompany, data.numPerson], ['Companies', 'Applicant']));
      new Chart(appReports, chartBarHandler(`Total Reports ${data.numOfReports}`, [data.numOfReportsEach[0].number_of_reports, data.numOfReportsEach[1].number_of_reports], [data.numOfReportsEach[0].account_type === 'c' ? 'Company' : 'Applicant', data.numOfReportsEach[1].account_type === 'c' ? 'Company' : 'Applicant']));
      new Chart(appReportsOpenClose, chartDoughnutHandler('Open/Close Reports', [data.numOfReportsOpen, data.numOfReportsCloesd], ['Open Report', 'Close Report']));
      let dataJob = [];
      let labelsJob = [];
      data.numOfJobsEach.forEach((job, index) => {
        if (index < 5) {
          dataJob.push(job.number_of_each_jobstitle)
          labelsJob.push(job.title)
        }
      })
      new Chart(jobs, chartBarHandler(`Total Jobs ${data.numOfJobs}`, dataJob, labelsJob));
      let dataApp = [];
      let labelsApp = [];
      data.statusApps.forEach(app => {
        dataApp.push(app.number_of_accepted_apps)
        labelsApp.push(`${app.status} Application`)
      })
      new Chart(statusApps, chartDoughnutHandler('Job Status', dataApp, labelsApp));

      let dataOffer = [];
      let labelaOfeer = [];
      data.offersStatus.forEach(app => {
        dataOffer.push(app.number_of_offers)
        labelaOfeer.push(`${app.status} Offer`)
      })
      new Chart(statusOffer, chartDoughnutHandler('Job Status', dataOffer, labelaOfeer));

      let offerJobTitle = [];
      let labelsOfferJobTitle = [];
      data.numOfOfferEach.forEach((jobTitle, index) => {
        if (index <= 8) {
          offerJobTitle.push(jobTitle.number_of_each_offertitle)
          labelsOfferJobTitle.push(jobTitle.title)
        }
      })
      new Chart(offerJob, chartBarHandler(`Most In Demand Job Offer`, offerJobTitle, labelsOfferJobTitle));


      new Chart(appOfferJob, chartBarHandler(`Number Of Application|Offers|Jobs`, [data.numOfTotalApp, data.numOfOffers, data.numOfJobs], ['Application', 'Offers', 'Jobs']));

      new Chart(dbApiRatio, chartDoughnutHandler('Job Status', [data.numOfDbApp, data.numOfApiApp], ['DataBase', 'Third Party Provider']));

      let compantAppNum = [];
      let labelsCompantAppNum = [];
      data.numOfCompanyAppEach.forEach((company, index) => {
        if (index < 5) {
          compantAppNum.push(company.number_of_each_companyapp)
          labelsCompantAppNum.push(company.company_name)
        }
      })

      new Chart(topComponiesSendApp, chartBarHandler(`Top Companies Interactive By Send Offers`, compantAppNum, labelsCompantAppNum));

      let compantOfferNum = [];
      let labelsCompantOfferNum = [];
      data.numOfCompanyOffersEach.forEach((company, index) => {
        if (index < 5) {
          compantOfferNum.push(company.number_of_each_companyoffers)
          labelsCompantOfferNum.push(company.company_name)
        }
      })

      new Chart(topComponiesSendOffer, chartBarHandler(`Top Companies Interactive By Received Application`, compantOfferNum, labelsCompantOfferNum));

      let applicpintNumJobTitle = [];
      let labelsapplicpintNumJobTitle = [];
      data.numberPersonEachJobTitle.forEach((company, index) => {
        if (index < 8) {
          applicpintNumJobTitle.push(company.number_person_ofeach_jobtilte)
          labelsapplicpintNumJobTitle.push(company.job_title)
        }
      })

      new Chart(topJobTitle, chartBarHandler(`Most Applicant Job Title`, applicpintNumJobTitle, labelsapplicpintNumJobTitle));


    } else if (context.token) {
      getData()
      setErrHand(false)
    }
  }, [data, context.token]);



  function People() {
    return topCountryPerson.map((item, index) => {

      return (
        <Row key={index} style={{ margin: '5px', fontSize: '19px', fontFamily: 'Fantasy', textAlign: 'center' }} className="country1">
          <Col style={{ fontSize: '19px', fontFamily: 'Fantasy' }}>{item.country}</Col>
          <Col style={{ fontSize: '19px', fontFamily: 'Fantasy' }}>{item.number_person_ofeach_country}</Col>
        </Row>
      )
    })
  }

  function Company() {
    return topCountryComapny.map((item, index) => {
      return (
        <Row key={index} style={{ margin: '5px', fontSize: '19px', fontFamily: 'Fantasy', textAlign: 'center' }} className="country1">
          <Col style={{ fontSize: '19px', fontFamily: 'Fantasy' }}>{item.country}</Col>
          <Col style={{ fontSize: '19px', fontFamily: 'Fantasy' }}>{item.number_company_ofeach_country}</Col>
        </Row>
      )
    })
  }
  const ScrollBarPage = () => {
    const scrollContainerStyle = { width: "200px", maxHeight: "200px", overflowY: 'scroll', overflowX: 'hidden' };
    return (
      <Row style={{ marginBottom: '100px' }}>
        <Col className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
          <MDBContainer>
            <People />
          </MDBContainer>
        </Col>
        <Col className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
          <MDBContainer>
            <Company />
          </MDBContainer>
        </Col>
      </Row >
    );
  }


  return (
    <Row style={{ width: '100%', backgroundColor: '#E1E3E8' }}>
      <Col sm={2}>
        <AdminHeader />

      </Col>
      <Col sm={10} style={{ marginTop: '50px' }}>
        <Row style={{ marginBottom: '120px', height: '400px', marginLeft: '50px', marginRight: '50px' }}>
          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="appUser" width="400" height="200"></canvas>
          </Col>
          <Col sm={1} style={{ padding: 0 }}></Col>
          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="appReportsOpenClose" width="400" height="200" ></canvas>
          </Col>
        </Row>

        <Row style={{ marginBottom: '120px', height: '400px', marginLeft: '50px', marginRight: '50px' }}>
          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="jobs" width="400" height="200"></canvas>
          </Col>
          <Col sm={1} style={{ padding: 0 }}></Col>

          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="appReports" width="400" height="200" ></canvas>
          </Col>
        </Row>

        <Row style={{ marginBottom: '120px', height: '400px', marginLeft: '50px', marginRight: '50px' }}>
          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="statusApps" width="400" height="200" ></canvas>
          </Col>
          <Col sm={1} style={{ padding: 0 }}></Col>

          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="statusOffer" width="400" height="200" ></canvas>
          </Col>
        </Row>

        <Row style={{ marginBottom: '120px', height: '400px', marginLeft: '50px', marginRight: '50px' }}>
          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>

            <canvas className='myChart' id="offerJob" width="200" height="50" ></canvas>
          </Col>
        </Row>
        {/* 
          <Row style={{
            height: '150px',
          }}>

          </Row> */}

        <Row style={{ marginBottom: '120px', height: '400px', marginLeft: '50px', marginRight: '50px' }} >
          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="appOfferJob" width="400" height="200" ></canvas>
          </Col>
          <Col sm={1} style={{ padding: 0 }}></Col>

          <Col className='flexCol' style={{ width: '400px', height: '400px', fontSize: '50px', fontFamily: 'Fantasy', textAlign: 'center', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            Average age
           <br />
            {avgAge} Years
        </Col>
        </Row>

        <Row style={{ marginBottom: '120px', height: '600px', marginLeft: '50px', marginRight: '50px' }}>
          <Col className='flexCol' style={{ width: '400px', height: '600px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>

            <canvas className='myChart' id="dbApiRatio" width="150" height="60" ></canvas>
          </Col>
        </Row>


        {/* 
        <Row style={{
          height: '150px',
        }}>

        </Row> */}
        <Row className="countryHeaderl">
          <Col style={{ fontSize: '19px', fontFamily: 'Fantasy' }}>Location</Col>
          <Col style={{ fontSize: '19px', fontFamily: 'Fantasy' }}>Total Applicant</Col>
          <Col style={{ fontSize: '19px', fontFamily: 'Fantasy' }}>Location</Col>
          <Col style={{ fontSize: '19px', fontFamily: 'Fantasy' }}>Total Companies</Col>
        </Row>
        <ScrollBarPage />

        <Row style={{ marginBottom: '0px', height: '600px', marginLeft: '50px', marginRight: '50px' }}>
          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="topComponiesSendApp" width="400" height="200" ></canvas>
          </Col>
          <Col sm={1}></Col>
          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="topComponiesSendOffer" width="400" height="200" ></canvas>
          </Col>
        </Row>


        <Row style={{ marginBottom: '120px', height: '600px', marginLeft: '50px', marginRight: '50px' }} >
          <Col className='flexCol' style={{ width: '400px', height: '400px', boxShadow: '0 0 5px #232B4E', backgroundColor: '#b4bdcc', borderRadius: '10px' }}>
            <canvas className='myChart' id="topJobTitle" width="400" height="100" ></canvas>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}



