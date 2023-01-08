import React from 'react';
import './card.scss'

export default function Card({ news }) {
  return (
    <div className="n_card d-flex flex-row">
      <div className="left col-5">
        <div className="n_img">
          <img src={news.urlToImage} alt="" />
        </div>
        <div className="n_date">
          {new Date(news.publishedAt).toDateString()}
        </div>
      </div>
      <div className="right col-7">
        <div className="title">
          {' '}
          <a href={news.url}>{news.title}</a>
        </div>
        <div className="desc">{news.description}</div>
      </div>
    </div>
  );
}
