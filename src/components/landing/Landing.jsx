import {  Pagination } from '@mui/material';
import React from 'react';
import './landing.scss';
import { Stack } from '@mui/system';
import Card from '../card/Card';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import Header from '../header/Header';

export default function Landing() {
  const {  page, setPage, all, getHeadlines } =
    useContext(MainContext);

  useEffect(() => {
    getHeadlines();
  }, [page]);
  return (
    <>
      {all && (
        <>
          <Header />
          <div className="container landing">
            <h3>India</h3>
            <div className="headlines">
              {all.map((news, i) => (
                <Card key={i} news={news} />
              ))}
            </div>
            <div className="pagination d-flex justify-content-center mt-3">
              <Stack spacing={2}>
                <Pagination
                  count={5}
                  variant="rounded"
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </Stack>
            </div>
          </div>
        </>
      )}
    </>
  );
}
