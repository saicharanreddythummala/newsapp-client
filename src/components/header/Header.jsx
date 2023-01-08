import React from 'react';
import { Avatar, Button, InputAdornment, TextField } from '@mui/material';
import './header.scss';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@mui/icons-material/Tune';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  const [show, setShow] = useState(false);
  const {
    getHeadlines,
    setKeywords,
    searchHandler,
    from,
    to,
    setFrom,
    setTo,
    user,
    logout,
  } = useContext(MainContext);

  return (
    <>
      {user && (
        <div className="container-fluid header">
          <div className="container">
            <div className="brand">News app</div>
            <div className="srch_bar flex-grow-1">
              <TextField
                placeholder="search for topics, locations & sources"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <FilterIcon onClick={() => setShow(!show)} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setKeywords(e.target.value)}
                onKeyDown={searchHandler}
              />
              <div className={show ? `show` : `hide`}>
                <table>
                  <tbody>
                    <tr className="d-flex mb-2">
                      <td className="col-4">From</td>
                      <td className="col-8">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            views={['day']}
                            value={from}
                            onChange={(val) => {
                              setFrom(val);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} helperText={null} />
                            )}
                            disableFuture
                          />
                        </LocalizationProvider>
                      </td>
                    </tr>
                    <tr className="d-flex">
                      <td className="col-4">To</td>
                      <td className="col-8">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            views={['day']}
                            value={to}
                            onChange={(val) => {
                              setTo(val);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} helperText={null} />
                            )}
                            disableFuture
                          />
                        </LocalizationProvider>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="srch d-flex justify-content-end mt-2">
                  <Button
                    variant="contained"
                    onClick={() => {
                      getHeadlines();
                      setShow(!show);
                    }}
                  >
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            <div className="user_opts d-flex justify-content-end">
              <div className="user">
                <div className="user_p d-flex">
                  <Avatar>
                    <img
                      src={
                        user.uPicture
                          ? `${user.uPicture.url}`
                          : `${user.gPicture}`
                      }
                      alt=""
                    />
                  </Avatar>
                  <p>{user.fullName}</p>
                </div>
                <p id="l_log">
                  last login: {new Date(user.lastLogin).toLocaleString()}
                </p>
              </div>

              <Button onClick={logout}>
                <LogoutIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
