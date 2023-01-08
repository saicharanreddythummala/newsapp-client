import React, { useContext, useEffect } from 'react';
import Landing from '../../components/landing/Landing';
import { Routes, Route } from 'react-router-dom';
import Login from '../login/Login';
import Register from '../register/Register';
import Loader from '../../components/loader/Loader';
import { MainContext } from '../../context/MainContext';
import Protected from '../../components/protectedRoute/Protected';

export default function Home() {
  const { loading, getUser } = useContext(MainContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <Landing />
                </Protected>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      )}
    </>
  );
}
