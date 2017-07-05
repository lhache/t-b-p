import React, { Component } from 'react';
import Translate from 'react-translate-component'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  let input

  return (
    <div>
      <Link to="/">
        <h1><Translate content="title" /></h1>
      </Link>
    </div>
  )
}


export default Header;
