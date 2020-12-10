import React,{useState,useEffect} from 'react';
import cookie from 'react-cookies';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';

dotenv.config();
const API = process.env.API_SERVER || 'https://jobify-app-v2.herokuapp.com/';
const SECRET = process.env.JWT_SECRET || 'z1337z';


export const AuthContext = React.createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [error, setError] = useState(false)


  useEffect(() => {
    const token = cookie.load('token');
    validateToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateToken = (token) => {
    try {
      const user = jwt.verify(token, SECRET);
      setLoginState(true, token, user);
    } catch (e) {
      setLoginState(false, null, {});
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save('token', token);
    setUser(user)
    setLoggedIn(loggedIn);
    setError(false)
  };

  const login = async (email, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .send({email,password})
      validateToken(response.body.token);
    } catch (e) {
      setError(true)
    }
  };

  const signup = async (username, email, password, role) => {
    // try {
    //   const response = await superagent
    //     .post(`${API}/signup`)
    //     .send({username,email,password,role});
    //   validateToken(response.body.token);
    //   console.log('here')
    // } catch (e) {
    //   setError(true)
    // }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  const state = { login, logout, signup, loggedIn,user,error,setError };


  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;