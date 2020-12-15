import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import { useHistory, useLocation } from "react-router-dom";


dotenv.config();
const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com'
const SECRET = process.env.JWT_SECRET || 'z1337z';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)

  let history = useHistory();
  useEffect(() => {
    const token = cookie.load('token');
    // console.log('load token', token)
    validateToken(token);
    setError(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { pathname } = useLocation();

  useEffect(() => {
    const oauthPath = pathname.split('/')

    // const element = document.getElementById('contAnima')
    // element.classList.add('fadeLoad')

    // setTimeout(()=>{
    // element.classList.remove('fadeLoad')
    // },1000)
    // console.log(oauthPath[1])
    // console.log(oauthPath[2])
    if (token && pathname !== '/logout') {
      // console.log('999')
      checkUser(token)
    } else if (pathname === '/logout') {
      logout();
      history.push('/')
    }
    if (oauthPath[1] === 'oauth') {
      // console.log(oauthPath[2], 'test')
      // cookie.clear('token');
      setToken(oauthPath[2])
      validateToken(oauthPath[2]);
      setTimeout(() => {
        history.push('/')
      }, 1000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const checkUser = async (tk) => {
    await superagent.get(`${API}/verify/0`).set({ 'Authorization': `Basic ${tk}` }).then((data) => {
      // console.log(data.body)
      if (data.body === 'blocked') {
        history.push("/banned")
      } else if (data.body === false && tk !== null) {
        history.push('/verify')
      }
    })
  }

  const validateToken = (token) => {
    try {
      const user = jwt.verify(token, SECRET);
      // setToken(token)
      setLoginState(true, token, user);
    } catch (e) {
      console.log('haa')
      setLoginState(false, null, {});
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save('token', token, { path: '/' });
    setToken(token)
    setUser(user)
    setLoggedIn(loggedIn);
    setError(false)
  };

  const login = async (email, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .send({ email, password })

      validateToken(response.body.token);
      return true
    } catch (e) {
      setLoginState(false, null, {});
      setError(true)
      return false
    }
  };

  const signup = async (payload, type) => {
    try {
      if (type === 'p') {
        const { firstName, lastName, email, phone, jobTitle, country, password } = payload;
        const response = await superagent
          .post(`${API}/signup`)
          .send({ first_name: firstName, last_name: lastName, email, phone, job_title: jobTitle, country, password, account_type: 'p' });
        validateToken(response.body.token);
        return true
      } else if (type === 'c') {
        const { companyName, email, phone, logo, url, country, password } = payload;
        const response = await superagent
          .post(`${API}/signup`)
          .send({ company_name: companyName, email, phone, logo, company_url: url, country, password, account_type: 'c' });
        validateToken(response.body.token);
        return true
      }
    } catch (e) {
      setLoginState(false, null, {});
      return
    }
  };

  const logout = () => {
    cookie.remove('token', { path: '/' })
    setLoginState(false, null, {});
  };

  const state = { login, logout, signup, loggedIn, user, error, setError, token, setToken, checkUser };


  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;