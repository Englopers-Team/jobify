import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import { useHistory, useLocation } from 'react-router-dom';

dotenv.config();
const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com';
const SECRET = process.env.JWT_SECRET || 'z1337z';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [error, setError] = useState(false);
  const [logo, setLogo] = useState('');
  const [name, setName] = useState('');

  let history = useHistory();
  useEffect(() => {
    const token = cookie.load('token');
    // console.log('load token', token)
    validateToken(token);
    setError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Esseili Edit to load the logo and the name and keep them updated always
  useEffect(() => {
    if (token && (user.account_type === 'p' || user.account_type === 'c')) {
      updateUser(token, user);
    }
  }, [token, user]);

  const { pathname } = useLocation();

  useEffect(() => {
    const oauthPath = pathname.split('/');

    // const element = document.getElementById('contAnima')
    // element.classList.add('fadeLoad')

    // setTimeout(()=>{
    // element.classList.remove('fadeLoad')
    // },1000)
    // console.log(oauthPath[1])
    // console.log(oauthPath[2])
    if (token && pathname !== '/logout') {
      checkUser(token);
    } else if (pathname === '/logout') {
      logout();
      setTimeout(() => {
        history.push('/');
      }, 100);
    }
    if (user.account_type === 'admin' && oauthPath[1] !== 'admin') {
      history.push('/admin');
    }

    if (oauthPath[1] === 'oauth') {
      // console.log(oauthPath[2], 'test')
      // cookie.clear('token');
      setToken(oauthPath[2]);
      validateToken(oauthPath[2]);
      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
    // Esseili Edit to load the logo and the name and keep them updated always
    if (user.account_type === 'p' || user.account_type === 'c') {
      updateUser(token, user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const checkUser = async (tk) => {
    await superagent
      .get(`${API}/verify/0`)
      .set({ Authorization: `Basic ${tk}` })
      .then((data) => {
        // console.log(data.body)
        if (data.body === 'blocked') {
          history.push('/banned');
        } else if (data.body === false && tk !== null) {
          history.push('/verify');
        }
      });
  };

  const validateToken = (token) => {
    try {
      const user = jwt.verify(token, SECRET);
      // setToken(token)
      setLoginState(true, token, user);
    } catch (e) {
      console.log('haa');
      setLoginState(false, null, {});
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save('token', token, { path: '/' });
    setUser(user);
    setLoggedIn(loggedIn);
    setError(false);
    setToken(token);
  };

  const login = async (email, password) => {
    try {
      const response = await superagent.post(`${API}/signin`).send({ email, password });

      validateToken(response.body.token);
      return true;
    } catch (e) {
      setLoginState(false, null, {});
      setError(true);
      return false;
    }
  };

  const signup = async (payload, type) => {
    try {
      if (type === 'p') {
        const { firstName, lastName, email, phone, jobTitle, country, password, avatar, cv } = payload;
        const response = await superagent.post(`${API}/signup`).send({ first_name: firstName, last_name: lastName, email, phone, job_title: jobTitle, country, cv: cv, avatar: avatar, password, account_type: 'p' });
        validateToken(response.body.token);
        return true;
      } else if (type === 'c') {
        const { companyName, email, phone, logo, url, country, password } = payload;
        const response = await superagent.post(`${API}/signup`).send({ company_name: companyName, email, phone, logo, company_url: url, country, password, account_type: 'c' });
        validateToken(response.body.token);
        return true;
      }
    } catch (e) {
      setLoginState(false, null, {});
      return;
    }
  };

  const logout = () => {
    cookie.remove('token', { path: '/' });
    setLoginState(false, null, {});
  };
  const updateUser = async (tk, user) => {
    const response = await superagent.get(`${API}/getInfo`).set('authorization', `Basic ${tk}`);
    if (user.account_type === 'p') {
      setLogo(response.body.avatar);
      setName(response.body.first_name);
    } else if (user.account_type === 'c') {
      setLogo(response.body.logo);
      setName(response.body.company_name);
    }
  };

  const state = { login, logout, signup, loggedIn, user, error, setError, token, setToken, checkUser, logo, name };

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
