import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';
import Contacts from './contacts/Contacts';
import UserProfile from './userProfile/UserProfile';
import { Context } from '../../store/Context';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AllRoutes = () => {
  const authContext = useContext(Context).isAuth;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/contacts"
          element={authContext ? <Contacts /> : <Login />}
        />
        <Route
          path="/userprofile"
          element={authContext ? <UserProfile /> : <Login />}
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
