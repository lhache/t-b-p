import React from 'react';
import Translate from 'react-translate-component'
import starIcon from '../../images/icon-star.svg'
import './Ratings.css'
import Rater from 'react-rater'


const Ratings = ({ratings}) => {
  return (
    <div>
      <Rater total={5} rating={ratings} interactive={false} />
    </div>
  )
}


export default Ratings;
