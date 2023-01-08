import { Button, Grid, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { useState } from 'react';
import './login.scss';
import GoogleIcon from '@mui/icons-material/Google';
import { MainContext } from '../../context/MainContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user, getNormalUser, URL } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null || undefined) {
      navigate('/');
    }
  }, [user]);

  const googleLogin = () => {
    window.open(`${URL}/auth/google`, '_self');
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="card">
            <div className="logins">
              <Grid container spacing={7} className="p-5">
                <Grid item xs={12}>
                  <TextField
                    placeholder="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" fullWidth onClick={()=>getNormalUser(username, password)}>
                    login
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className="or d-flex justify-content-around pe-5 ps-5">
              <hr />
              <span>or</span>
              <hr />
            </div>
            <div className="oauth">
              <div className="google" onClick={googleLogin}>
                <GoogleIcon /> Login with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
