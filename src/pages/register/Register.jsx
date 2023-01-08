import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useState, useContext } from 'react';
import '../login/login.scss';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { MainContext } from '../../context/MainContext';
import avatarImg from '../../assets/avatarImg.png';
import UploadIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(avatarImg);

  const navigate = useNavigate();

  const { URL } = useContext(MainContext);

  const googleLogin = () => {
    window.open(`${URL}/auth/google`, '_self');
  };

  let userData = {
    username,
    email,
    password,
    avatar,
  };

  const registerChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const registerUser = async () => {
    if (password !== confirmPassword) {
      alert('passwords do not match');
    } else {
      await axios.post(`${URL}/user/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: 'include',
      });
      navigate('/');
    }
  };

  return (
    <>
      <div className="container-fluid login">
        <div className="container">
          <div className="card">
            <div className="logins">
              <Grid container spacing={3} className="p-5">
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
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setconfirmPassword(e.target.value);
                    }}
                    fullWidth
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="u_picture d-flex justify-content-between">
                    <div className="avt">
                      <img src={avatarPreview} alt="" />
                    </div>
                    <label htmlFor="u_img">
                      <UploadIcon />
                    </label>
                    <input
                      type="file"
                      id="u_img"
                      name="avatar"
                      accept="image/*"
                      onChange={registerChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => registerUser()}
                  >
                    register
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
              <div className="google" onClick={() => googleLogin()}>
                <GoogleIcon /> SignUp with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
