//all fetches and auth state

import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const Context = React.createContext({
  // State of the entire application
  isAuth: false,
  login: (email, password) => {},
  register: (name, email, password) => {},
  logout: () => {},
  add: (name, number) => {},
  get: () => {},
  delete: id => {},
  token: token => {},
  contacts: date => {},
});

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('token', token);
};

const removeAuthToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const loginHandler = async (email, password) => {
    const toSend = { email, password };

    try {
      const res = await axios.post('users/login', toSend);
      setAuthHeader(res.data.token);
      setIsAuthenticated(true);
      setOrRemoveToken(res.data.token, email);
      return res.data;
    } catch (err) {
      setIsAuthenticated(false);
      console.log(err);
    }
  };

  const registerHandler = async (name, email, password) => {
    const toSend = { name, email, password };

    try {
      const res = await axios.post('users/signup', toSend);

      setAuthHeader(res.data.token);
      setOrRemoveToken(res.data.token, email);
      setIsAuthenticated(true);
      return res.data;
    } catch (err) {
      removeAuthToken();
      setIsAuthenticated(false);

      console.log(err);
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.post('users/logout');
      removeAuthToken();
      setOrRemoveToken('');
      setIsAuthenticated(false);
    } catch (err) {}
  };

  const getContacts = async () => {
    try {
      const res = await axios.get('contacts', {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });

      return getAllContactsHandler(res.data);
    } catch (err) {
      console(err);
    }
  };

  const addContact = async (name, number) => {
    const toSend = { name, number };
    try {
      const res = await axios.post('contacts', toSend, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });

      return res.data;
    } catch (err) {
      console(err);
    }
  };

  const deleteContact = async contactId => {
    try {
      const res = await axios.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      return res.data;
    } catch (err) {
      console(err);
    }
  };

  const setOrRemoveToken = (token, email) => {
    let isToken;

    if (token) {
      isToken = localStorage.setItem('token', token);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    }

    return isToken;
  };

  const getAllContactsHandler = data => {
    let latestArrayOfContacts = [];
    data.forEach(contact => latestArrayOfContacts.push(contact));
    return latestArrayOfContacts;
  };

  const auth = {
    isAuth: isAuthenticated,
    login: loginHandler,
    isRegister: isRegistered,
    register: registerHandler,
    logout: logoutHandler,
    get: getContacts,
    delete: deleteContact,
    add: addContact,
    token: setOrRemoveToken,
    contacts: getAllContactsHandler,
  };

  return <Context.Provider value={auth}>{props.children}</Context.Provider>;
};

export default AuthContextProvider;
