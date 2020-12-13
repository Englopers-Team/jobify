import CompanyHeader from './company';
import UserHeader from './user';
import GuestHeader from './guest';
import './styles.scss';
import { NavLink, Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './styles.scss';
import * as Icon from 'react-bootstrap-icons';
import superagent from 'superagent';
import Button from 'react-bootstrap/Button';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
export default function Header() {
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState('');
  // const [loader, setLoader] = useState(false);
  let history = useHistory();

  useEffect(() => {
    getData();
  }, []);
  const API = 'https://jobify-app-v2.herokuapp.com';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudF90eXBlIjoiYyIsInByb2ZpbGUiOnsiaWQiOjEsIm5hbWUiOiJEZW1vIENvbXBhbnkiLCJsb2dvIjoiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL3N2Zy9zdGF0aWMvaWNvbnMvc3ZnLzk5My85OTM4OTEuc3ZnIiwiY291bnRyeSI6IlVTQSJ9LCJpYXQiOjE2MDc3MzMwNjIsImV4cCI6MzYxNjA3NzMzMDYyfQ.4m57l6B3uXRcUpylAEzUAdfNx0E3xTuh9SukCEtZuX8';
  async function getData() {
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${token}`);
    setCompanyName(response.body.company_name);
    setLogo(response.body.logo);
  }

  return (
    <>
      <CompanyHeader />
      <UserHeader />
      <GuestHeader />
    </>
  );
}
