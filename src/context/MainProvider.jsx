import React, { useEffect } from 'react';
import { useState } from 'react';
import { MainContext } from './MainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MainProvider({ children }) {
  const now = new Date();
  const URL = 'http://localhost:4000';
  const navigate = useNavigate();

  const [all, setAll] = useState([]);

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const [from, setFrom] = useState(
    `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  );

  const [to, setTo] = useState(
    `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  );

  const [keywords, setKeywords] = useState('India');
  const [page, setPage] = useState(1);

  //convert search to url encoded
  const search = encodeURIComponent(
    keywords === '' ? 'India' : keywords
  ).replaceAll('%20', '+');

  //get news
  const getHeadlines = async () => {
    const { data } = await axios.get(
      `https://newsapi.org/v2/everything?q=${search}&page=${page}&from=${new Date(
        from
      ).toISOString()}&to=${new Date(to).toISOString()}`,
      {
        headers: {
          'x-api-key': `${process.env.REACT_APP_API_KEY}`,
        },
      }
    );
    setAll(data.articles);
  };

  //search handler
  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      setPage(1);
      getHeadlines();
    }
  };

  //get oAuth user
  async function getUser() {
    try {
      // setLoading(true);

      const { data } = await axios.get(`${URL}/auth/login/success`, {
          withCredentials: true,
        })
        .catch((err) => {
          console.log(err.message);
        });

      if (data.success === false) {
        setLoading(false);
        setUser(null);
        navigate('/login');
      } else {
        setUser(data.user.doc);
        setLoading(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  //get user without oauth
  async function getNormalUser(username, password) {
    setLoading(true);

    const { data } = await axios
      .post(
        `${URL}/user/login`,
        { username, password },
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log(err.message);
      });

    if (data.success === false) {
      setLoading(false);
      setUser(null);
      navigate('/login');
    } else {
      setUser(data.user);
      setLoading(false);
    }
  }

  //user logout
  const logout = async () => {
     await axios.get(`${URL}/auth/log`);
    await axios.get(`${URL}/user/logout`, {
      withCredentials: 'include',
    });
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);



  //refresh new every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      getHeadlines();
      setPage(1);
    }, 1000 * 60 * 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <MainContext.Provider
      value={{
        all,
        keywords,
        setKeywords,
        getHeadlines,
        page,
        setPage,
        searchHandler,
        from,
        setFrom,
        to,
        setTo,
        loading,
        user,
        URL,
        getUser,
        logout,
        getNormalUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
