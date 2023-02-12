//all fetches and auth state

import React, { useEffect, useState } from 'react';
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
  refresh: () => {},
  isRefreshed: false,
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
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

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
      // setIsAuthenticated(false);

      console.log(err);
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.post('users/logout');
      removeAuthToken();
      setOrRemoveToken('');
      setIsAuthenticated(false);
    } catch (err) {
      console.log(err);
    }
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
      const res = await axios.delete(`contacts/${contactId}`, {
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

  const refreshPage = async () => {
    let token = localStorage.getItem('token');

    if (!token) {
      return;
    } else {
      setAuthHeader(token);
      try {
        console.log('trying to refresh', token);
        const res = await axios.get('users/current');
        setIsAuthenticated(true);
        setLoading(true);

        return res.data;
      } catch (err) {
        console(err);
      }
    }
  };

  const getAllContactsHandler = data => {
    let latestArrayOfContacts = [];
    data.forEach(contact => latestArrayOfContacts.push(contact));
    return latestArrayOfContacts;
  };

  const waitingForResponse = data => {
    setLoading(data);
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
    refresh: refreshPage,
    isRefreshed: loading,
  };

  return <Context.Provider value={auth}>{props.children}</Context.Provider>;
};

export default AuthContextProvider;
