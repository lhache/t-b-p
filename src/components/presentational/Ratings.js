import React from 'react';
import Rater from 'react-rater'
import './Ratings.css'

const Ratings = ({ratings}) => {
  return (
    <div>
      <Rater total={5} rating={parseInt(ratings, 10)} interactive={false} />
    </div>
  )
}


export default Ratings;
