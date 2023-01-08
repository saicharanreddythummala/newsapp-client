import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../context/MainContext';

export default function Protected({ children }) {
  const { loading, user } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user === null || undefined) {
        navigate('/login');
      }
    }
  }, [user]);

  return children;
}
