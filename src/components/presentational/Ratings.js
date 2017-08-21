import React from 'react';
import Rater from 'react-rater'
import './Ratings.css'

const Ratings = ({ratings}) => {

  ratings = parseInt(ratings, 2)

  return (
    <div>
      <Rater total={5} rating={ratings} interactive={false} />
    </div>
  )
}


export default Ratings;
